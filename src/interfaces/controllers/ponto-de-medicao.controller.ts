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
import { CreatePontoDeMedicaoDto } from '../../application/dto/create-ponto-de-medicao.dto';
import { UpdatePontoDeMedicaoDto } from '../../application/dto/update-ponto-de-medicao.dto';
import { PontoDeMedicaoResponseDto } from '../../application/dto/ponto-de-medicao-response.dto';
import { CreatePontoDeMedicaoUseCase } from '../../application/use-cases/ponto-de-medicao/create-ponto-de-medicao.use-case';
import { FindAllPontosDeMedicaoUseCase } from '../../application/use-cases/ponto-de-medicao/find-all-pontos-de-medicao.use-case';
import { FindPontoDeMedicaoByIdUseCase } from '../../application/use-cases/ponto-de-medicao/find-ponto-de-medicao-by-id.use-case';
import { FindPontosDeMedicaoByUnidadeUseCase } from '../../application/use-cases/ponto-de-medicao/find-pontos-de-medicao-by-unidade.use-case';
import { UpdatePontoDeMedicaoUseCase } from '../../application/use-cases/ponto-de-medicao/update-ponto-de-medicao.use-case';
import { DeletePontoDeMedicaoUseCase } from '../../application/use-cases/ponto-de-medicao/delete-ponto-de-medicao.use-case';

@ApiTags('pontos-de-medicao')
@Controller('pontos-de-medicao')
export class PontoDeMedicaoController {
  constructor(
    private readonly createPontoDeMedicaoUseCase: CreatePontoDeMedicaoUseCase,
    private readonly findAllPontosDeMedicaoUseCase: FindAllPontosDeMedicaoUseCase,
    private readonly findPontoDeMedicaoByIdUseCase: FindPontoDeMedicaoByIdUseCase,
    private readonly findPontosDeMedicaoByUnidadeUseCase: FindPontosDeMedicaoByUnidadeUseCase,
    private readonly updatePontoDeMedicaoUseCase: UpdatePontoDeMedicaoUseCase,
    private readonly deletePontoDeMedicaoUseCase: DeletePontoDeMedicaoUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo ponto de medição' })
  @ApiBody({ type: CreatePontoDeMedicaoDto })
  @ApiResponse({
    status: 201,
    description: 'Ponto de medição criado com sucesso',
    type: PontoDeMedicaoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidade não encontrada',
  })
  create(@Body() createPontoDeMedicaoDto: CreatePontoDeMedicaoDto) {
    return this.createPontoDeMedicaoUseCase.execute(createPontoDeMedicaoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pontos de medição' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pontos de medição retornada com sucesso',
    type: [PontoDeMedicaoResponseDto],
  })
  findAll() {
    return this.findAllPontosDeMedicaoUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar ponto de medição por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do ponto de medição',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Ponto de medição encontrado com sucesso',
    type: PontoDeMedicaoResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Ponto de medição não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.findPontoDeMedicaoByIdUseCase.execute(id);
  }

  @Get('unidade/:unidadeId')
  @ApiOperation({ summary: 'Buscar pontos de medição por unidade' })
  @ApiParam({
    name: 'unidadeId',
    description: 'ID da unidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pontos de medição da unidade retornada com sucesso',
    type: [PontoDeMedicaoResponseDto],
  })
  findByUnidade(@Param('unidadeId') unidadeId: string) {
    return this.findPontosDeMedicaoByUnidadeUseCase.execute(unidadeId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar ponto de medição' })
  @ApiParam({
    name: 'id',
    description: 'ID do ponto de medição',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdatePontoDeMedicaoDto })
  @ApiResponse({
    status: 200,
    description: 'Ponto de medição atualizado com sucesso',
    type: PontoDeMedicaoResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Ponto de medição não encontrado',
  })
  update(
    @Param('id') id: string,
    @Body() updatePontoDeMedicaoDto: UpdatePontoDeMedicaoDto,
  ) {
    return this.updatePontoDeMedicaoUseCase.execute(
      id,
      updatePontoDeMedicaoDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar ponto de medição' })
  @ApiParam({
    name: 'id',
    description: 'ID do ponto de medição',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Ponto de medição deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Ponto de medição não encontrado',
  })
  remove(@Param('id') id: string) {
    return this.deletePontoDeMedicaoUseCase.execute(id);
  }
}
