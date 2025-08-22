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
import { CreateEstadoDto } from '../../application/dto/create-estado.dto';
import { UpdateEstadoDto } from '../../application/dto/update-estado.dto';
import { EstadoResponseDto } from '../../application/dto/estado-response.dto';
import { CreateEstadoUseCase } from '../../application/use-cases/estado/create-estado.use-case';
import { FindAllEstadosUseCase } from '../../application/use-cases/estado/find-all-estados.use-case';
import { FindEstadoByIdUseCase } from '../../application/use-cases/estado/find-estado-by-id.use-case';
import { FindEstadosByRegiaoUseCase } from '../../application/use-cases/estado/find-estados-by-regiao.use-case';
import { UpdateEstadoUseCase } from '../../application/use-cases/estado/update-estado.use-case';
import { DeleteEstadoUseCase } from '../../application/use-cases/estado/delete-estado.use-case';

@ApiTags('estados')
@Controller('estados')
export class EstadoController {
  constructor(
    private readonly createEstadoUseCase: CreateEstadoUseCase,
    private readonly findAllEstadosUseCase: FindAllEstadosUseCase,
    private readonly findEstadoByIdUseCase: FindEstadoByIdUseCase,
    private readonly findEstadosByRegiaoUseCase: FindEstadosByRegiaoUseCase,
    private readonly updateEstadoUseCase: UpdateEstadoUseCase,
    private readonly deleteEstadoUseCase: DeleteEstadoUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo estado' })
  @ApiBody({ type: CreateEstadoDto })
  @ApiResponse({
    status: 201,
    description: 'Estado criado com sucesso',
    type: EstadoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.createEstadoUseCase.execute(createEstadoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os estados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de estados retornada com sucesso',
    type: [EstadoResponseDto],
  })
  findAll() {
    return this.findAllEstadosUseCase.execute();
  }

  @Get('regiao/:regiaoId')
  @ApiOperation({ summary: 'Listar estados por região' })
  @ApiParam({
    name: 'regiaoId',
    description: 'ID da região',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de estados da região retornada com sucesso',
    type: [EstadoResponseDto],
  })
  findByRegiao(@Param('regiaoId') regiaoId: string) {
    return this.findEstadosByRegiaoUseCase.execute(regiaoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar estado por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do estado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado encontrado com sucesso',
    type: EstadoResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Estado não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.findEstadoByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar estado' })
  @ApiParam({
    name: 'id',
    description: 'ID do estado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateEstadoDto })
  @ApiResponse({
    status: 200,
    description: 'Estado atualizado com sucesso',
    type: EstadoResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Estado não encontrado',
  })
  update(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto) {
    return this.updateEstadoUseCase.execute(id, updateEstadoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar estado' })
  @ApiParam({
    name: 'id',
    description: 'ID do estado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Estado deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Estado não encontrado',
  })
  remove(@Param('id') id: string) {
    return this.deleteEstadoUseCase.execute(id);
  }
}
