import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '../http/http.module';
import { DatabaseModule } from '../database/database.module';
import { MedidasDailyProcessor } from './processors/medidas-daily.processor';
import { MedidasDailySchedulerService } from './services/medidas-daily-scheduler.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
          password: configService.get('REDIS_PASSWORD'),
          db: configService.get('REDIS_DB', 0),
        },
        defaultJobOptions: {
          removeOnComplete: 100,
          removeOnFail: 50,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'measures-daily',
    }),
    ScheduleModule.forRoot(),
    HttpModule,
    DatabaseModule,
  ],
  providers: [MedidasDailyProcessor, MedidasDailySchedulerService],
  exports: [BullModule, MedidasDailySchedulerService],
})
export class QueueModule {}
