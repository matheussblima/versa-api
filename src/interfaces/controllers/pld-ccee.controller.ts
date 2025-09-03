import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SearchPldCceeUseCase } from '../../application/use-cases/pld/search-pld-ccee.use-case';
import { PldCceeResponseDto } from '../../application/dto/pld-ccee-response.dto';
import { PldCceeParamsDto } from '../../application/dto/pld-ccee-params.dto';

@ApiTags('pld-ccee')
@Controller('pld-ccee')
export class PldCceeController {
  constructor(private readonly searchPldCceeUseCase: SearchPldCceeUseCase) {}

  @Get('ccee')
  @ApiOperation({
    summary: 'Buscar PLD na CCEE',
    description:
      'Busca PLD (Preço de Liquidação das Diferenças) na CCEE por período e tipo. Os dados são obtidos diretamente da API da CCEE.',
  })
  @ApiQuery({
    name: 'dataInicio',
    description: 'Data de início para consulta (formato ISO)',
    example: '2024-01-15T00:00:00.000Z',
  })
  @ApiQuery({
    name: 'dataFim',
    description: 'Data de fim para consulta (formato ISO)',
    example: '2024-01-15T23:59:59.999Z',
  })
  @ApiQuery({
    name: 'codigoPerfilAgente',
    description: 'Código do perfil do agente na CCEE',
    example: 'AGENTE_001',
  })
  @ApiQuery({
    name: 'tipo',
    description: 'Tipo do PLD',
    example: 'HORARIO',
    enum: ['HORARIO', 'SEMANAL', 'MENSAL'],
    required: false,
  })
  @ApiQuery({
    name: 'numero',
    description: 'Número da página (padrão: 1)',
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: 'quantidadeItens',
    description: 'Quantidade de itens por página (padrão: 50, máximo: 1000)',
    example: 50,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Pesquisa na CCEE realizada com sucesso',
    type: [PldCceeResponseDto],
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
    @Query() params: PldCceeParamsDto,
  ): Promise<PldCceeResponseDto[]> {
    try {
      return await this.searchPldCceeUseCase.execute(params);
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
