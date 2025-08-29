import { Injectable, Inject, Logger } from '@nestjs/common';
import {
  ICceeMedidaQuinzeMinutosService,
  CCEE_MEDIDA_QUINZE_MINUTOS_SERVICE,
} from '../../../domain/services/ccee-medida-quinze-minutos.service';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';
import {
  IMedidaQuinzeMinutosRepository,
  MEDIDA_QUINZE_MINUTOS_REPOSITORY,
} from '../../../domain/repositories/medida-quinze-minutos.repository.interface';
import { MedidaQuinzeMinutos } from '../../../domain/entities/medida-quinze-minutos.entity';

export interface FetchMedidasQuinzeMinutosSyncParams {
  referenceDate: string;
  measurementPointCode?: string;
  forceUpdate?: boolean;
}

export interface FetchMedidasQuinzeMinutosSyncResult {
  totalPoints: number;
  totalMeasures: number;
  processedPoints: number;
  skippedPoints: number;
  errors: string[];
  details: {
    pointCode: string;
    measuresFound: number;
    measuresSaved: number;
    error?: string;
  }[];
}

@Injectable()
export class FetchMedidasQuinzeMinutosSyncUseCase {
  private readonly logger = new Logger(
    FetchMedidasQuinzeMinutosSyncUseCase.name,
  );

  constructor(
    @Inject(CCEE_MEDIDA_QUINZE_MINUTOS_SERVICE)
    private readonly cceeMedidaQuinzeMinutosService: ICceeMedidaQuinzeMinutosService,
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
    @Inject(MEDIDA_QUINZE_MINUTOS_REPOSITORY)
    private readonly medidaQuinzeMinutosRepository: IMedidaQuinzeMinutosRepository,
  ) {}

  async execute(
    params: FetchMedidasQuinzeMinutosSyncParams,
  ): Promise<FetchMedidasQuinzeMinutosSyncResult> {
    const { referenceDate, measurementPointCode, forceUpdate = false } = params;

    this.logger.log(
      `Iniciando busca síncrona de medições de 15 minutos para ${referenceDate}${
        measurementPointCode ? ` - Ponto: ${measurementPointCode}` : ''
      }`,
    );

    const result: FetchMedidasQuinzeMinutosSyncResult = {
      totalPoints: 0,
      totalMeasures: 0,
      processedPoints: 0,
      skippedPoints: 0,
      errors: [],
      details: [],
    };

    try {
      let measurementPoints: any[];

      if (measurementPointCode) {
        const point =
          await this.pontoDeMedicaoRepository.findByCodigo(
            measurementPointCode,
          );
        if (!point) {
          throw new Error(
            `Ponto de medição ${measurementPointCode} não encontrado`,
          );
        }
        measurementPoints = [point];
      } else {
        measurementPoints = await this.pontoDeMedicaoRepository.findAll();
      }

      result.totalPoints = measurementPoints.length;

      this.logger.log(
        `Buscando medições de 15 minutos para ${measurementPoints.length} pontos de medição`,
      );

      for (const point of measurementPoints) {
        try {
          const pointResult = await this.fetchMeasuresForPoint(
            referenceDate,
            point.codigo,
            forceUpdate,
          );

          result.details.push(pointResult);
          result.totalMeasures += pointResult.measuresSaved;

          if (pointResult.error) {
            result.errors.push(`${point.codigo}: ${pointResult.error}`);
          } else if (pointResult.measuresSaved === 0) {
            result.skippedPoints++;
          } else {
            result.processedPoints++;
          }
        } catch (error) {
          const errorMsg = `Erro ao processar ponto ${point.codigo}: ${error.message}`;
          this.logger.error(errorMsg);
          result.errors.push(errorMsg);
          result.details.push({
            pointCode: point.codigo,
            measuresFound: 0,
            measuresSaved: 0,
            error: error.message,
          });
        }
      }

      this.logger.log(
        `Busca síncrona concluída. Processados: ${result.processedPoints}, Pulados: ${result.skippedPoints}, Erros: ${result.errors.length}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Erro na busca síncrona de medições: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private async fetchMeasuresForPoint(
    referenceDate: string,
    measurementPointCode: string,
    forceUpdate: boolean,
  ): Promise<{
    pointCode: string;
    measuresFound: number;
    measuresSaved: number;
    error?: string;
  }> {
    this.logger.log(
      `Buscando medições de 15 minutos para ponto ${measurementPointCode} em ${referenceDate}`,
    );

    let pageNumber = 1;
    let hasMoreData = true;
    const allMeasures: MedidaQuinzeMinutos[] = [];

    while (hasMoreData) {
      try {
        const formattedDate = this.formatDateForCcee(referenceDate);

        const measures =
          await this.cceeMedidaQuinzeMinutosService.fetchMedidasQuinzeMinutos({
            codigoPontoMedicao: measurementPointCode,
            dataReferencia: formattedDate,
            numero: pageNumber,
            quantidadeItens: 500,
          });

        if (measures.length === 0) {
          hasMoreData = false;
        } else {
          allMeasures.push(...measures);
          pageNumber++;

          if (measures.length < 500) {
            hasMoreData = false;
          }
        }
      } catch (error) {
        this.logger.error(
          `Erro ao buscar página ${pageNumber} para ${measurementPointCode}: ${error.message}`,
        );
        return {
          pointCode: measurementPointCode,
          measuresFound: 0,
          measuresSaved: 0,
          error: error.message,
        };
      }
    }

    this.logger.log(
      `Total de ${allMeasures.length} medições de 15 minutos encontradas para ${measurementPointCode}`,
    );

    try {
      const savedCount = await this.saveMeasuresToDatabase(
        allMeasures,
        measurementPointCode,
        forceUpdate,
      );

      return {
        pointCode: measurementPointCode,
        measuresFound: allMeasures.length,
        measuresSaved: savedCount,
      };
    } catch (error) {
      return {
        pointCode: measurementPointCode,
        measuresFound: allMeasures.length,
        measuresSaved: 0,
        error: error.message,
      };
    }
  }

  private async saveMeasuresToDatabase(
    measures: MedidaQuinzeMinutos[],
    measurementPointCode: string,
    forceUpdate: boolean,
  ): Promise<number> {
    if (measures.length === 0) {
      this.logger.log(
        `Nenhuma medida para salvar para o ponto ${measurementPointCode}`,
      );
      return 0;
    }

    try {
      const referenceDate = new Date(measures[0].dataHora);
      const startDate = new Date(referenceDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(referenceDate);
      endDate.setHours(23, 59, 59, 999);

      if (!forceUpdate) {
        const existingMeasures =
          await this.medidaQuinzeMinutosRepository.findByPontoMedicaoAndDateRange(
            measurementPointCode,
            startDate,
            endDate,
          );

        if (existingMeasures.length > 0) {
          this.logger.log(
            `Já existem ${existingMeasures.length} medidas para o ponto ${measurementPointCode} na data ${referenceDate.toISOString().split('T')[0]}. Pulando...`,
          );
          return 0;
        }
      } else {
        // Se forceUpdate for true, remove as medidas existentes
        await this.medidaQuinzeMinutosRepository.deleteByPontoMedicaoAndDateRange(
          measurementPointCode,
          startDate,
          endDate,
        );
        this.logger.log(
          `Medidas existentes removidas para o ponto ${measurementPointCode} na data ${referenceDate.toISOString().split('T')[0]}`,
        );
      }

      const uniqueMeasures = new Map<string, MedidaQuinzeMinutos>();
      for (const measure of measures) {
        const key = `${measure.codigoPontoMedicao}_${measure.dataHora.toISOString()}`;
        if (!uniqueMeasures.has(key)) {
          uniqueMeasures.set(key, measure);
        }
      }

      const measuresToSave = Array.from(uniqueMeasures.values());

      this.logger.log(
        `Salvando ${measuresToSave.length} medições únicas no banco de dados para o ponto ${measurementPointCode}`,
      );

      const savedMeasures =
        await this.medidaQuinzeMinutosRepository.saveMany(measuresToSave);

      this.logger.log(
        `${savedMeasures.length} medições salvas com sucesso para o ponto ${measurementPointCode}`,
      );

      return savedMeasures.length;
    } catch (error) {
      this.logger.error(
        `Erro ao salvar medições para o ponto ${measurementPointCode}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private formatDateForCcee(dateString: string): string {
    if (dateString.includes('T')) {
      return dateString;
    }

    const date = new Date(dateString);
    return date.toISOString();
  }
}
