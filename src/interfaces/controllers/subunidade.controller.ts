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
import { CreateSubUnidadeDto } from '../../application/dto/create-subunidade.dto';
import { UpdateSubUnidadeDto } from '../../application/dto/update-subunidade.dto';
import { SubUnidadeResponseDto } from '../../application/dto/subunidade-response.dto';
import { CreateSubUnidadeUseCase } from '../../application/use-cases/subunidade/create-subunidade.use-case';
import { FindAllSubUnidadesUseCase } from '../../application/use-cases/subunidade/find-all-subunidades.use-case';
import { FindSubUnidadeByIdUseCase } from '../../application/use-cases/subunidade/find-subunidade-by-id.use-case';
import { UpdateSubUnidadeUseCase } from '../../application/use-cases/subunidade/update-subunidade.use-case';
import { DeleteSubUnidadeUseCase } from '../../application/use-cases/subunidade/delete-subunidade.use-case';

@ApiTags('subunidades')
@Controller('subunidades')
export class SubUnidadeController {
  constructor(
    private readonly createSubUnidadeUseCase: CreateSubUnidadeUseCase,
    private readonly findAllSubUnidadesUseCase: FindAllSubUnidadesUseCase,
    private readonly findSubUnidadeByIdUseCase: FindSubUnidadeByIdUseCase,
    private readonly updateSubUnidadeUseCase: UpdateSubUnidadeUseCase,
    private readonly deleteSubUnidadeUseCase: DeleteSubUnidadeUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova subunidade' })
  @ApiBody({ type: CreateSubUnidadeDto })
  @ApiResponse({
    status: 201,
    description: 'Subunidade criada com sucesso',
    type: SubUnidadeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  create(@Body() createSubUnidadeDto: CreateSubUnidadeDto) {
    return this.createSubUnidadeUseCase.execute(createSubUnidadeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as subunidades' })
  @ApiResponse({
    status: 200,
    description: 'Lista de subunidades retornada com sucesso',
    type: [SubUnidadeResponseDto],
  })
  findAll() {
    return this.findAllSubUnidadesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar subunidade por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID da subunidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Subunidade encontrada com sucesso',
    type: SubUnidadeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Subunidade não encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.findSubUnidadeByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar subunidade' })
  @ApiParam({
    name: 'id',
    description: 'ID da subunidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateSubUnidadeDto })
  @ApiResponse({
    status: 200,
    description: 'Subunidade atualizada com sucesso',
    type: SubUnidadeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Subunidade não encontrada',
  })
  update(
    @Param('id') id: string,
    @Body() updateSubUnidadeDto: UpdateSubUnidadeDto,
  ) {
    return this.updateSubUnidadeUseCase.execute(id, updateSubUnidadeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar subunidade' })
  @ApiParam({
    name: 'id',
    description: 'ID da subunidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Subunidade deletada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Subunidade não encontrada',
  })
  remove(@Param('id') id: string) {
    return this.deleteSubUnidadeUseCase.execute(id);
  }
}
