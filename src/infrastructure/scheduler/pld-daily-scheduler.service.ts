import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FetchPldSyncUseCase } from '../../application/use-cases/pld/fetch-pld-sync.use-case';

@Injectable()
export class PldDailySchedulerService {
  private readonly logger = new Logger(PldDailySchedulerService.name);

  constructor(private readonly fetchPldSyncUseCase: FetchPldSyncUseCase) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'fetch-pld-previous-day',
    timeZone: 'America/Sao_Paulo',
  })
  async scheduleFetchPldPreviousDay() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const referenceDate = yesterday.toISOString().split('T')[0];

    this.logger.log(
      `Executando busca automática de PLD para o dia anterior: ${referenceDate}`,
    );

    try {
      const result = await this.fetchPldSyncUseCase.execute({
        referenceDate,
        forceUpdate: false,
        tipo: 'HORARIO',
      });

      this.logger.log(
        `Busca automática de PLD concluída para ${referenceDate}. ` +
          `Total de registros: ${result.totalRecords}, ` +
          `Salvos: ${result.savedRecords}, ` +
          `Pulados: ${result.skippedRecords}, ` +
          `Erros: ${result.errors.length}`,
      );
    } catch (error) {
      this.logger.error(
        `Erro na busca automática de PLD para ${referenceDate}: ${error.message}`,
        error.stack,
      );
    }
  }

  async scheduleFetchPldForDate(
    referenceDate: string,
    forceUpdate: boolean = false,
    tipo: string = 'HORARIO',
  ) {
    this.logger.log(
      `Iniciando busca manual de PLD para ${referenceDate}${
        forceUpdate ? ' (forçando atualização)' : ''
      }`,
    );

    try {
      const result = await this.fetchPldSyncUseCase.execute({
        referenceDate,
        forceUpdate,
        tipo,
      });

      this.logger.log(
        `Busca manual de PLD concluída para ${referenceDate}. ` +
          `Total de registros: ${result.totalRecords}, ` +
          `Salvos: ${result.savedRecords}, ` +
          `Pulados: ${result.skippedRecords}, ` +
          `Erros: ${result.errors.length}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Erro na busca manual de PLD para ${referenceDate}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
