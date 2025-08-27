import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Inject } from '@nestjs/common';
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

export interface MeasuresDailyJobData {
  referenceDate: string;
  measurementPointCode?: string;
}

@Processor('measures-daily')
export class MeasuresDailyProcessor {
  private readonly logger = new Logger(MeasuresDailyProcessor.name);

  constructor(
    @Inject(CCEE_MEDIDA_QUINZE_MINUTOS_SERVICE)
    private readonly cceeMedidaQuinzeMinutosService: ICceeMedidaQuinzeMinutosService,
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
    @Inject(MEDIDA_QUINZE_MINUTOS_REPOSITORY)
    private readonly medidaQuinzeMinutosRepository: IMedidaQuinzeMinutosRepository,
  ) {}

  @Process('fetch-measures-previous-day')
  async handleFetchMeasuresPreviousDay(job: Job<MeasuresDailyJobData>) {
    const { referenceDate, measurementPointCode } = job.data;

    this.logger.log(
      `Iniciando busca de medições de 15 minutos para ${referenceDate}${
        measurementPointCode ? ` - Ponto: ${measurementPointCode}` : ''
      }`,
    );

    try {
      if (!measurementPointCode) {
        await this.fetchMeasuresForAllPoints(referenceDate);
      } else {
        await this.fetchMeasuresForPoint(referenceDate, measurementPointCode);
      }

      this.logger.log(
        `Busca de medições de 15 minutos concluída com sucesso para ${referenceDate}`,
      );
    } catch (error) {
      this.logger.error(
        `Erro ao buscar medições de 15 minutos para ${referenceDate}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private async fetchMeasuresForAllPoints(referenceDate: string) {
    const measurementPoints = await this.pontoDeMedicaoRepository.findAll();

    this.logger.log(
      `Buscando medições de 15 minutos para ${measurementPoints.length} pontos de medição`,
    );

    const promises = measurementPoints.map((point) =>
      this.fetchMeasuresForPoint(referenceDate, point.codigo),
    );

    await Promise.allSettled(promises);
  }

  private async fetchMeasuresForPoint(
    referenceDate: string,
    measurementPointCode: string,
  ) {
    this.logger.log(
      `Buscando medições de 15 minutos para ponto ${measurementPointCode} em ${referenceDate}`,
    );

    let pageNumber = 1;
    let hasMoreData = true;
    const allMeasures: MedidaQuinzeMinutos[] = [];

    while (hasMoreData) {
      try {
        const measures =
          await this.cceeMedidaQuinzeMinutosService.fetchMedidasQuinzeMinutos({
            codigoPontoMedicao: measurementPointCode,
            dataReferencia: referenceDate,
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
        throw error;
      }
    }

    this.logger.log(
      `Total de ${allMeasures.length} medições de 15 minutos encontradas para ${measurementPointCode}`,
    );

    await this.saveMeasuresToDatabase(allMeasures, measurementPointCode);
  }

  private async saveMeasuresToDatabase(
    measures: MedidaQuinzeMinutos[],
    measurementPointCode: string,
  ) {
    if (measures.length === 0) {
      this.logger.log(
        `Nenhuma medida para salvar para o ponto ${measurementPointCode}`,
      );
      return;
    }

    try {
      const referenceDate = new Date(measures[0].dataHora);
      const startDate = new Date(referenceDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(referenceDate);
      endDate.setHours(23, 59, 59, 999);

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
        return;
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
    } catch (error) {
      this.logger.error(
        `Erro ao salvar medições para o ponto ${measurementPointCode}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
