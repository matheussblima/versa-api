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
import { CreateMedidaQuinzeMinutosDto } from '../../application/dto/create-medida-quinze-minutos.dto';
import { UpdateMedidaQuinzeMinutosDto } from '../../application/dto/update-medida-quinze-minutos.dto';
import { MedidaQuinzeMinutosResponseDto } from '../../application/dto/medida-quinze-minutos-response.dto';
import { CreateMedidaQuinzeMinutosUseCase } from '../../application/use-cases/medida-quinze-minutos/create-medida-quinze-minutos.use-case';
import { FindAllMedidasQuinzeMinutosUseCase } from '../../application/use-cases/medida-quinze-minutos/find-all-medidas-quinze-minutos.use-case';
import { FindMedidaQuinzeMinutosByIdUseCase } from '../../application/use-cases/medida-quinze-minutos/find-medida-quinze-minutos-by-id.use-case';
import { UpdateMedidaQuinzeMinutosUseCase } from '../../application/use-cases/medida-quinze-minutos/update-medida-quinze-minutos.use-case';
import { DeleteMedidaQuinzeMinutosUseCase } from '../../application/use-cases/medida-quinze-minutos/delete-medida-quinze-minutos.use-case';

@ApiTags('medidas-quinze-minutos')
@Controller('medidas-quinze-minutos')
export class MedidaQuinzeMinutosCrudController {
  constructor(
    private readonly createMedidaQuinzeMinutosUseCase: CreateMedidaQuinzeMinutosUseCase,
    private readonly findAllMedidasQuinzeMinutosUseCase: FindAllMedidasQuinzeMinutosUseCase,
    private readonly findMedidaQuinzeMinutosByIdUseCase: FindMedidaQuinzeMinutosByIdUseCase,
    private readonly updateMedidaQuinzeMinutosUseCase: UpdateMedidaQuinzeMinutosUseCase,
    private readonly deleteMedidaQuinzeMinutosUseCase: DeleteMedidaQuinzeMinutosUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova medida de quinze minutos' })
  @ApiBody({ type: CreateMedidaQuinzeMinutosDto })
  @ApiResponse({
    status: 201,
    description: 'Medida de quinze minutos criada com sucesso',
    type: MedidaQuinzeMinutosResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 409,
    description:
      'Já existe uma medida para o mesmo ponto de medição e data/hora',
  })
  create(@Body() createMedidaQuinzeMinutosDto: CreateMedidaQuinzeMinutosDto) {
    return this.createMedidaQuinzeMinutosUseCase.execute(
      createMedidaQuinzeMinutosDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as medidas de quinze minutos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de medidas de quinze minutos retornada com sucesso',
    type: [MedidaQuinzeMinutosResponseDto],
  })
  findAll() {
    return this.findAllMedidasQuinzeMinutosUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar medida de quinze minutos por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID da medida de quinze minutos',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Medida de quinze minutos encontrada com sucesso',
    type: MedidaQuinzeMinutosResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Medida de quinze minutos não encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.findMedidaQuinzeMinutosByIdUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar medida de quinze minutos' })
  @ApiParam({
    name: 'id',
    description: 'ID da medida de quinze minutos',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateMedidaQuinzeMinutosDto })
  @ApiResponse({
    status: 200,
    description: 'Medida de quinze minutos atualizada com sucesso',
    type: MedidaQuinzeMinutosResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Medida de quinze minutos não encontrada',
  })
  @ApiResponse({
    status: 409,
    description:
      'Já existe uma medida para o mesmo ponto de medição e data/hora',
  })
  update(
    @Param('id') id: string,
    @Body() updateMedidaQuinzeMinutosDto: UpdateMedidaQuinzeMinutosDto,
  ) {
    return this.updateMedidaQuinzeMinutosUseCase.execute(
      id,
      updateMedidaQuinzeMinutosDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar medida de quinze minutos' })
  @ApiParam({
    name: 'id',
    description: 'ID da medida de quinze minutos',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Medida de quinze minutos deletada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Medida de quinze minutos não encontrada',
  })
  remove(@Param('id') id: string) {
    return this.deleteMedidaQuinzeMinutosUseCase.execute(id);
  }
}
