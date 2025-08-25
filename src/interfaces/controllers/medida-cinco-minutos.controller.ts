import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SearchMedidasCincoMinutosCceeUseCase } from '../../application/use-cases/medida-cinco-minutos/search-medidas-cinco-minutos-ccee.use-case';
import { MedidaCincoMinutosCceeResponseDto } from '../../application/dto/medida-cinco-minutos-ccee-response.dto';
import { MedidaCincoMinutosParamsDto } from '../../application/dto/medida-cinco-minutos-params.dto';

@ApiTags('medidas-cinco-minutos')
@Controller('medidas-cinco-minutos')
export class MedidaCincoMinutosController {
  constructor(
    private readonly searchMedidasCincoMinutosCceeUseCase: SearchMedidasCincoMinutosCceeUseCase,
  ) {}

  @Get('ccee')
  @ApiOperation({
    summary: 'Pesquisar medidas de cinco minutos na CCEE',
    description:
      'Busca medidas de cinco minutos na CCEE por ponto de medição e período',
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
    type: [MedidaCincoMinutosCceeResponseDto],
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
  ): Promise<MedidaCincoMinutosCceeResponseDto[]> {
    try {
      return await this.searchMedidasCincoMinutosCceeUseCase.execute(params);
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
