import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FetchMedidasQuinzeMinutosSyncUseCase } from '../../application/use-cases/medida-quinze-minutos/fetch-medidas-quinze-minutos-sync.use-case';
import {
  FetchMedidasQuinzeMinutosSyncDto,
  FetchMedidasQuinzeMinutosSyncResponseDto,
} from '../../application/dto/fetch-medidas-quinze-minutos-sync.dto';

@ApiTags('medidas-quinze-minutos-sync')
@Controller('medidas-quinze-minutos-sync')
export class MedidaQuinzeMinutosSyncController {
  constructor(
    private readonly fetchMedidasQuinzeMinutosSyncUseCase: FetchMedidasQuinzeMinutosSyncUseCase,
  ) {}

  @Post('fetch')
  @ApiOperation({
    summary: 'Buscar medições de 15 minutos de forma síncrona',
    description:
      'Busca medições de 15 minutos da CCEE e salva no banco de dados de forma síncrona, sem usar Redis. ' +
      'Esta operação pode demorar dependendo da quantidade de pontos de medição e dados disponíveis.',
  })
  @ApiBody({
    type: FetchMedidasQuinzeMinutosSyncDto,
    description: 'Parâmetros para busca síncrona de medições',
  })
  @ApiResponse({
    status: 201,
    description: 'Busca realizada com sucesso',
    type: FetchMedidasQuinzeMinutosSyncResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
  })
  @ApiResponse({
    status: 404,
    description:
      'Ponto de medição não encontrado (quando measurementPointCode é informado)',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor ou erro na comunicação com a CCEE',
  })
  async fetchMedidasSync(
    @Body() dto: FetchMedidasQuinzeMinutosSyncDto,
  ): Promise<FetchMedidasQuinzeMinutosSyncResponseDto> {
    try {
      const result = await this.fetchMedidasQuinzeMinutosSyncUseCase.execute({
        referenceDate: dto.referenceDate,
        measurementPointCode: dto.measurementPointCode,
        forceUpdate: dto.forceUpdate || false,
      });

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
          error: `Erro na busca síncrona de medições: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
