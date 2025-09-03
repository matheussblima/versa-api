import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApplicationModule } from '../../application/application.module';
import { MedidasDailySchedulerService } from './medidas-daily-scheduler.service';
import { PldDailySchedulerService } from './pld-daily-scheduler.service';

@Module({
  imports: [ScheduleModule.forRoot(), ApplicationModule],
  providers: [MedidasDailySchedulerService, PldDailySchedulerService],
  exports: [MedidasDailySchedulerService, PldDailySchedulerService],
})
export class SchedulerModule {}
