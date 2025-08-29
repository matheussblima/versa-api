import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { MedidasDailySchedulerService } from '../../infrastructure/scheduler/medidas-daily-scheduler.service';
import {
  FetchMedidasQuinzeMinutosSyncDto,
  FetchMedidasQuinzeMinutosSyncResponseDto,
} from '../../application/dto/fetch-medidas-quinze-minutos-sync.dto';

@ApiTags('scheduler')
@Controller('scheduler')
export class SchedulerController {
  constructor(
    private readonly medidasDailySchedulerService: MedidasDailySchedulerService,
  ) {}

  @Post('schedule-medidas')
  @ApiOperation({
    summary: 'Agendar busca de medições de 15 minutos para uma data específica',
    description:
      'Permite agendar manualmente a busca de medições de 15 minutos para uma data específica (sem Redis)',
  })
  @ApiBody({
    type: FetchMedidasQuinzeMinutosSyncDto,
    description: 'Dados para agendar a busca de medições de 15 minutos',
  })
  @ApiResponse({
    status: 201,
    description: 'Busca realizada com sucesso',
    type: FetchMedidasQuinzeMinutosSyncResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description:
      'Ponto de medição não encontrado (quando measurementPointCode é informado)',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
  })
  async scheduleMedidas(
    @Body() dto: FetchMedidasQuinzeMinutosSyncDto,
  ): Promise<FetchMedidasQuinzeMinutosSyncResponseDto> {
    try {
      const result =
        await this.medidasDailySchedulerService.scheduleFetchMeasuresForDate(
          dto.referenceDate,
          dto.measurementPointCode,
          dto.forceUpdate || false,
        );

      return result;
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erro ao agendar busca de medições: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('status')
  @ApiOperation({
    summary: 'Obter status do scheduler',
    description: 'Retorna informações sobre o status do scheduler (sem Redis)',
  })
  @ApiResponse({
    status: 200,
    description: 'Status do scheduler obtido com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Scheduler funcionando sem Redis' },
        cronActive: { type: 'boolean', example: true },
        nextExecution: { type: 'string', example: '2024-01-16T00:00:00.000Z' },
      },
    },
  })
  async getSchedulerStatus() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return {
      message: 'Scheduler funcionando sem Redis',
      cronActive: true,
      nextExecution: tomorrow.toISOString(),
      currentTime: now.toISOString(),
    };
  }
}
