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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUnidadeDto } from '../../application/dto/create-unidade.dto';
import { UpdateUnidadeDto } from '../../application/dto/update-unidade.dto';
import { UnidadeResponseDto } from '../../application/dto/unidade-response.dto';
import { CreateUnidadeUseCase } from '../../application/use-cases/unidade/create-unidade.use-case';
import { FindAllUnidadesUseCase } from '../../application/use-cases/unidade/find-all-unidades.use-case';
import { FindUnidadeByIdUseCase } from '../../application/use-cases/unidade/find-unidade-by-id.use-case';
import { UpdateUnidadeUseCase } from '../../application/use-cases/unidade/update-unidade.use-case';
import { DeleteUnidadeUseCase } from '../../application/use-cases/unidade/delete-unidade.use-case';

@ApiTags('unidades')
@Controller('unidades')
export class UnidadeController {
  constructor(
    private readonly createUnidadeUseCase: CreateUnidadeUseCase,
    private readonly findAllUnidadesUseCase: FindAllUnidadesUseCase,
    private readonly findUnidadeByIdUseCase: FindUnidadeByIdUseCase,
    private readonly updateUnidadeUseCase: UpdateUnidadeUseCase,
    private readonly deleteUnidadeUseCase: DeleteUnidadeUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova unidade' })
  @ApiBody({ type: CreateUnidadeDto })
  @ApiResponse({
    status: 201,
    description: 'Unidade criada com sucesso',
    type: UnidadeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  create(@Body() createUnidadeDto: CreateUnidadeDto) {
    return this.createUnidadeUseCase.execute(createUnidadeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as unidades' })
  @ApiResponse({
    status: 200,
    description: 'Lista de unidades retornada com sucesso',
    type: [UnidadeResponseDto],
  })
  findAll() {
    return this.findAllUnidadesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar unidade por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID da unidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Unidade encontrada com sucesso',
    type: UnidadeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Unidade não encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.findUnidadeByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar unidade' })
  @ApiParam({
    name: 'id',
    description: 'ID da unidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateUnidadeDto })
  @ApiResponse({
    status: 200,
    description: 'Unidade atualizada com sucesso',
    type: UnidadeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Unidade não encontrada',
  })
  update(@Param('id') id: string, @Body() updateUnidadeDto: UpdateUnidadeDto) {
    return this.updateUnidadeUseCase.execute(id, updateUnidadeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar unidade' })
  @ApiParam({
    name: 'id',
    description: 'ID da unidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Unidade deletada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidade não encontrada',
  })
  remove(@Param('id') id: string) {
    return this.deleteUnidadeUseCase.execute(id);
  }
}
