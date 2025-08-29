import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApplicationModule } from '../../application/application.module';
import { MedidasDailySchedulerService } from './medidas-daily-scheduler.service';

@Module({
  imports: [ScheduleModule.forRoot(), ApplicationModule],
  providers: [MedidasDailySchedulerService],
  exports: [MedidasDailySchedulerService],
})
export class SchedulerModule {}
