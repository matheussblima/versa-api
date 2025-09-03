import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreatePldUseCase } from '../../application/use-cases/pld/create-pld.use-case';
import { FindAllPldUseCase } from '../../application/use-cases/pld/find-all-pld.use-case';
import { FindPldByIdUseCase } from '../../application/use-cases/pld/find-pld-by-id.use-case';
import { UpdatePldUseCase } from '../../application/use-cases/pld/update-pld.use-case';
import { DeletePldUseCase } from '../../application/use-cases/pld/delete-pld.use-case';
import { CreatePldDto } from '../../application/dto/create-pld.dto';
import { UpdatePldDto } from '../../application/dto/update-pld.dto';
import { PldResponseDto } from '../../application/dto/pld-response.dto';
import { PldPaginatedResponseDto } from '../../application/dto/pld-paginated-response.dto';
import { FindAllPldParamsDto } from '../../application/dto/find-all-pld-params.dto';

@ApiTags('pld')
@Controller('pld')
export class PldCrudController {
  constructor(
    private readonly createPldUseCase: CreatePldUseCase,
    private readonly findAllPldUseCase: FindAllPldUseCase,
    private readonly findPldByIdUseCase: FindPldByIdUseCase,
    private readonly updatePldUseCase: UpdatePldUseCase,
    private readonly deletePldUseCase: DeletePldUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo registro PLD' })
  @ApiBody({ type: CreatePldDto })
  @ApiResponse({
    status: 201,
    description: 'PLD criado com sucesso',
    type: PldResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'PLD já existe para o submercado e data/hora informados',
  })
  create(@Body() createPldDto: CreatePldDto) {
    return this.createPldUseCase.execute(createPldDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os PLDs' })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de PLDs retornada com sucesso',
    type: PldPaginatedResponseDto,
  })
  findAll(@Query() params: FindAllPldParamsDto) {
    return this.findAllPldUseCase.execute(
      params.dataInicio,
      params.dataFim,
      params.codigoSubmercado,
      params.tipo,
      params.page,
      params.limit,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar PLD por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do PLD',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'PLD encontrado com sucesso',
    type: PldResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'PLD não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.findPldByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar PLD' })
  @ApiParam({
    name: 'id',
    description: 'ID do PLD',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdatePldDto })
  @ApiResponse({
    status: 200,
    description: 'PLD atualizado com sucesso',
    type: PldResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'PLD não encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'PLD já existe para o submercado e data/hora informados',
  })
  update(@Param('id') id: string, @Body() updatePldDto: UpdatePldDto) {
    return this.updatePldUseCase.execute(id, updatePldDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar PLD' })
  @ApiParam({
    name: 'id',
    description: 'ID do PLD',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'PLD deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'PLD não encontrado',
  })
  remove(@Param('id') id: string) {
    return this.deletePldUseCase.execute(id);
  }
}
