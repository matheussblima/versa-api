import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Inject } from '@nestjs/common';
import {
  ICceeMedidaCincoMinutosService,
  CCEE_MEDIDA_CINCO_MINUTOS_SERVICE,
} from '../../../domain/services/ccee-medida-cinco-minutos.service';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';
import { MedidaCincoMinutos } from '../../../domain/entities/medida-cinco-minutos.entity';

export interface MedidasDailyJobData {
  referenceDate: string;
  measurementPointCode?: string;
}

@Processor('measures-daily')
export class MedidasDailyProcessor {
  private readonly logger = new Logger(MedidasDailyProcessor.name);

  constructor(
    @Inject(CCEE_MEDIDA_CINCO_MINUTOS_SERVICE)
    private readonly cceeMedidaCincoMinutosService: ICceeMedidaCincoMinutosService,
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
  ) {}

  @Process('fetch-measures-previous-day')
  async handleFetchMeasuresPreviousDay(job: Job<MedidasDailyJobData>) {
    const { referenceDate, measurementPointCode } = job.data;

    this.logger.log(
      `Iniciando busca de medições para ${referenceDate}${
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
        `Busca de medições concluída com sucesso para ${referenceDate}`,
      );
    } catch (error) {
      this.logger.error(
        `Erro ao buscar medições para ${referenceDate}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private async fetchMeasuresForAllPoints(referenceDate: string) {
    const pontosDeMedicao = await this.pontoDeMedicaoRepository.findAll();

    this.logger.log(
      `Buscando medições para ${pontosDeMedicao.length} pontos de medição`,
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
      `Buscando medições para ponto ${measurementPointCode} em ${referenceDate}`,
    );

    let numero = 1;
    let hasMoreData = true;
    const todasMedidas: MedidaCincoMinutos[] = [];

    while (hasMoreData) {
      try {
        const medidas =
          await this.cceeMedidaCincoMinutosService.fetchMedidasCincoMinutos({
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
      `Total de ${todasMedidas.length} medições encontradas para ${measurementPointCode}`,
    );

    // Aqui você pode adicionar lógica para salvar as medições no banco de dados
    // await this.salvarMedidasNoBanco(todasMedidas);
  }
}
