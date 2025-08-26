import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Cron, CronExpression } from '@nestjs/schedule';

export interface MedidasDailyJobData {
  referenceDate: string;
  measurementPointCode?: string;
}

@Injectable()
export class MedidasDailySchedulerService {
  private readonly logger = new Logger(MedidasDailySchedulerService.name);

  constructor(
    @InjectQueue('measures-daily')
    private readonly medidasDailyQueue: Queue<MedidasDailyJobData>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'fetch-measures-previous-day',
    timeZone: 'America/Sao_Paulo',
  })
  async scheduleFetchMeasuresPreviousDay() {
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);

    const referenceDate = ontem.toISOString().split('T')[0];

    this.logger.log(
      `Agendando busca de medições para o dia anterior: ${referenceDate}`,
    );

    try {
      await this.medidasDailyQueue.add(
        'fetch-measures-previous-day',
        {
          referenceDate,
        },
        {
          priority: 1,
          delay: 0,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
        },
      );

      this.logger.log(
        `Tarefa agendada com sucesso para buscar medições de ${referenceDate}`,
      );
    } catch (error) {
      this.logger.error(
        `Erro ao agendar tarefa para ${referenceDate}: ${error.message}`,
      );
    }
  }

  async scheduleFetchMeasuresForDate(
    referenceDate: string,
    measurementPointCode?: string,
  ) {
    this.logger.log(
      `Agendando busca manual de medições para ${referenceDate}${
        measurementPointCode ? ` - Ponto: ${measurementPointCode}` : ''
      }`,
    );

    try {
      await this.medidasDailyQueue.add(
        'fetch-measures-previous-day',
        {
          referenceDate,
          measurementPointCode,
        },
        {
          priority: 2,
          delay: 0,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
        },
      );

      this.logger.log(
        `Tarefa manual agendada com sucesso para ${referenceDate}`,
      );
    } catch (error) {
      this.logger.error(
        `Erro ao agendar tarefa manual para ${referenceDate}: ${error.message}`,
      );
      throw error;
    }
  }

  async getQueueStatus() {
    const waiting = await this.medidasDailyQueue.getWaiting();
    const active = await this.medidasDailyQueue.getActive();
    const completed = await this.medidasDailyQueue.getCompleted();
    const failed = await this.medidasDailyQueue.getFailed();

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
    };
  }
}
