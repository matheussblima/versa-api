import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SearchMedidasQuinzeMinutosCceeUseCase } from '../../application/use-cases/medida-quinze-minutos/search-medidas-quinze-minutos-ccee.use-case';
import { MedidaQuinzeMinutosCceeResponseDto } from '../../application/dto/medida-quinze-minutos-ccee-response.dto';
import { MedidaCincoMinutosParamsDto } from '../../application/dto/medida-cinco-minutos-params.dto';

@ApiTags('medidas-quinze-minutos')
@Controller('medidas-quinze-minutos')
export class MedidaQuinzeMinutosController {
  constructor(
    private readonly searchMedidasQuinzeMinutosCceeUseCase: SearchMedidasQuinzeMinutosCceeUseCase,
  ) {}

  @Get('ccee')
  @ApiOperation({
    summary: 'Buscar medidas de quinze minutos na CCEE',
    description:
      'Busca medidas de quinze minutos na CCEE por ponto de medição e período. As medidas são calculadas através da agregação das medidas de 5 minutos.',
  })
  @ApiQuery({
    name: 'codigoPontoMedicao',
    description: 'Código do ponto de medição',
    example: 'RSPKSCALADM01',
  })
  @ApiQuery({
    name: 'dataReferencia',
    description: 'Data de referência para consulta (formato ISO)',
    example: '2024-01-15T00:00:00.000Z',
  })
  @ApiQuery({
    name: 'numero',
    description: 'Número da página (padrão: 1)',
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: 'quantidadeItens',
    description: 'Quantidade de itens por página (padrão: 500, máximo: 1000)',
    example: 500,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Pesquisa na CCEE realizada com sucesso',
    type: [MedidaQuinzeMinutosCceeResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao conectar com a CCEE',
  })
  async searchByCcee(
    @Query() params: MedidaCincoMinutosParamsDto,
  ): Promise<MedidaQuinzeMinutosCceeResponseDto[]> {
    try {
      return await this.searchMedidasQuinzeMinutosCceeUseCase.execute(params);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
