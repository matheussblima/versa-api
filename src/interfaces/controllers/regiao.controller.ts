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
import { CreateRegiaoDto } from '../../application/dto/create-regiao.dto';
import { UpdateRegiaoDto } from '../../application/dto/update-regiao.dto';
import { RegiaoResponseDto } from '../../application/dto/regiao-response.dto';
import { CreateRegiaoUseCase } from '../../application/use-cases/regiao/create-regiao.use-case';
import { FindAllRegioesUseCase } from '../../application/use-cases/regiao/find-all-regioes.use-case';
import { FindRegiaoByIdUseCase } from '../../application/use-cases/regiao/find-regiao-by-id.use-case';
import { UpdateRegiaoUseCase } from '../../application/use-cases/regiao/update-regiao.use-case';
import { DeleteRegiaoUseCase } from '../../application/use-cases/regiao/delete-regiao.use-case';

@ApiTags('regioes')
@Controller('regioes')
export class RegiaoController {
  constructor(
    private readonly createRegiaoUseCase: CreateRegiaoUseCase,
    private readonly findAllRegioesUseCase: FindAllRegioesUseCase,
    private readonly findRegiaoByIdUseCase: FindRegiaoByIdUseCase,
    private readonly updateRegiaoUseCase: UpdateRegiaoUseCase,
    private readonly deleteRegiaoUseCase: DeleteRegiaoUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova região' })
  @ApiBody({ type: CreateRegiaoDto })
  @ApiResponse({
    status: 201,
    description: 'Região criada com sucesso',
    type: RegiaoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  create(@Body() createRegiaoDto: CreateRegiaoDto) {
    return this.createRegiaoUseCase.execute(createRegiaoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as regiões' })
  @ApiResponse({
    status: 200,
    description: 'Lista de regiões retornada com sucesso',
    type: [RegiaoResponseDto],
  })
  findAll() {
    return this.findAllRegioesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar região por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID da região',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Região encontrada com sucesso',
    type: RegiaoResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Região não encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.findRegiaoByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar região' })
  @ApiParam({
    name: 'id',
    description: 'ID da região',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateRegiaoDto })
  @ApiResponse({
    status: 200,
    description: 'Região atualizada com sucesso',
    type: RegiaoResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Região não encontrada',
  })
  update(@Param('id') id: string, @Body() updateRegiaoDto: UpdateRegiaoDto) {
    return this.updateRegiaoUseCase.execute(id, updateRegiaoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar região' })
  @ApiParam({
    name: 'id',
    description: 'ID da região',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Região deletada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Região não encontrada',
  })
  remove(@Param('id') id: string) {
    return this.deleteRegiaoUseCase.execute(id);
  }
}
