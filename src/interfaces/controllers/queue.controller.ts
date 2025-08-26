import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { MedidasDailySchedulerService } from '../../infrastructure/queue/services/medidas-daily-scheduler.service';

import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleMedidasDto {
  @ApiProperty({
    description: 'Reference date for search (YYYY-MM-DD format)',
    example: '2024-01-15',
  })
  @IsString()
  @IsDateString()
  referenceDate: string;

  @ApiProperty({
    description: 'Measurement point code (optional)',
    example: 'RSPKSCALADM01',
    required: false,
  })
  @IsOptional()
  @IsString()
  measurementPointCode?: string;
}

export class QueueStatusDto {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
}

@ApiTags('queue')
@Controller('queue')
export class QueueController {
  constructor(
    private readonly medidasDailySchedulerService: MedidasDailySchedulerService,
  ) {}

  @Post('schedule-medidas')
  @ApiOperation({
    summary: 'Agendar busca de medições para uma data específica',
    description:
      'Permite agendar manualmente a busca de medições para uma data específica',
  })
  @ApiBody({
    type: ScheduleMedidasDto,
    description: 'Dados para agendar a busca de medições',
  })
  @ApiResponse({
    status: 201,
    description: 'Tarefa agendada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
  })
  async scheduleMedidas(@Body() dto: ScheduleMedidasDto) {
    try {
      await this.medidasDailySchedulerService.scheduleFetchMeasuresForDate(
        dto.referenceDate,
        dto.measurementPointCode,
      );

      return {
        message: 'Task scheduled successfully',
        referenceDate: dto.referenceDate,
        measurementPointCode: dto.measurementPointCode,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error scheduling task: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('status')
  @ApiOperation({
    summary: 'Obter status das filas',
    description: 'Retorna o status atual das filas de processamento',
  })
  @ApiResponse({
    status: 200,
    description: 'Status das filas obtido com sucesso',
    type: QueueStatusDto,
  })
  async getQueueStatus(): Promise<QueueStatusDto> {
    try {
      return await this.medidasDailySchedulerService.getQueueStatus();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erro ao obter status das filas: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
