import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FetchMedidasQuinzeMinutosSyncUseCase } from '../../application/use-cases/medida-quinze-minutos/fetch-medidas-quinze-minutos-sync.use-case';

@Injectable()
export class MedidasDailySchedulerService {
  private readonly logger = new Logger(MedidasDailySchedulerService.name);

  constructor(
    private readonly fetchMedidasQuinzeMinutosSyncUseCase: FetchMedidasQuinzeMinutosSyncUseCase,
  ) {}

  @Cron(process.env.SCHEDULER_CRON ?? CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'fetch-measures-previous-day',
    timeZone: 'America/Sao_Paulo',
  })
  async scheduleFetchMeasuresPreviousDay() {
    const doisDiasAtras = new Date();
    doisDiasAtras.setDate(doisDiasAtras.getDate() - 2);
    doisDiasAtras.setHours(0, 0, 0, 0);

    const referenceDate = doisDiasAtras.toISOString();

    this.logger.log(
      `Iniciando busca automática de medições de 15 minutos para dois dias atrás: ${referenceDate}`,
    );

    try {
      const result = await this.fetchMedidasQuinzeMinutosSyncUseCase.execute({
        referenceDate,
        forceUpdate: false,
      });

      this.logger.log(
        `Busca automática concluída para ${referenceDate}. ` +
          `Total de medidas: ${result.totalMeasures}, ` +
          `Pontos processados: ${result.processedPoints}, ` +
          `Pontos pulados: ${result.skippedPoints}, ` +
          `Erros: ${result.errors.length}`,
      );

      if (result.errors.length > 0) {
        this.logger.error(
          `Erros encontrados na busca automática: ${result.errors.join(', ')}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Erro na busca automática para ${referenceDate}: ${error.message}`,
        error.stack,
      );
    }
  }

  async scheduleFetchMeasuresForDate(
    referenceDate: string,
    measurementPointCode?: string,
    forceUpdate: boolean = false,
  ) {
    this.logger.log(
      `Iniciando busca manual de medições de 15 minutos para ${referenceDate}${
        measurementPointCode ? ` - Ponto: ${measurementPointCode}` : ''
      }`,
    );

    try {
      const result = await this.fetchMedidasQuinzeMinutosSyncUseCase.execute({
        referenceDate,
        measurementPointCode,
        forceUpdate,
      });

      this.logger.log(
        `Busca manual concluída para ${referenceDate}. ` +
          `Total de medidas: ${result.totalMeasures}, ` +
          `Pontos processados: ${result.processedPoints}, ` +
          `Pontos pulados: ${result.skippedPoints}, ` +
          `Erros: ${result.errors.length}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Erro na busca manual para ${referenceDate}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
