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
import { MedidaQuinzeMinutos } from '../../../domain/entities/medida-quinze-minutos.entity';

export interface MedidasDailyJobData {
  referenceDate: string;
  measurementPointCode?: string;
}

@Processor('measures-daily')
export class MedidasDailyProcessor {
  private readonly logger = new Logger(MedidasDailyProcessor.name);

  constructor(
    @Inject(CCEE_MEDIDA_QUINZE_MINUTOS_SERVICE)
    private readonly cceeMedidaQuinzeMinutosService: ICceeMedidaQuinzeMinutosService,
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
  ) {}

  @Process('fetch-measures-previous-day')
  async handleFetchMeasuresPreviousDay(job: Job<MedidasDailyJobData>) {
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
    const pontosDeMedicao = await this.pontoDeMedicaoRepository.findAll();

    this.logger.log(
      `Buscando medições de 15 minutos para ${pontosDeMedicao.length} pontos de medição`,
    );

    const promises = pontosDeMedicao.map((ponto) =>
      this.fetchMeasuresForPoint(referenceDate, ponto.codigo),
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

    let numero = 1;
    let hasMoreData = true;
    const todasMedidas: MedidaQuinzeMinutos[] = [];

    while (hasMoreData) {
      try {
        const medidas =
          await this.cceeMedidaQuinzeMinutosService.fetchMedidasQuinzeMinutos({
            codigoPontoMedicao: measurementPointCode,
            dataReferencia: referenceDate,
            numero,
            quantidadeItens: 500,
          });

        if (medidas.length === 0) {
          hasMoreData = false;
        } else {
          todasMedidas.push(...medidas);
          numero++;

          if (medidas.length < 500) {
            hasMoreData = false;
          }
        }
      } catch (error) {
        this.logger.error(
          `Erro ao buscar página ${numero} para ${measurementPointCode}: ${error.message}`,
        );
        throw error;
      }
    }

    this.logger.log(
      `Total de ${todasMedidas.length} medições de 15 minutos encontradas para ${measurementPointCode}`,
    );

    // Aqui você pode adicionar lógica para salvar as medições no banco de dados
    // await this.salvarMedidasNoBanco(todasMedidas);
  }
}
