import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { CreateUnidadeDto } from './create-unidade.dto';

export class UpdateUnidadeDto extends PartialType(CreateUnidadeDto) {
  @ApiProperty({
    description: 'Nome da unidade (opcional para atualização)',
    example: 'Unidade Industrial A - Atualizada',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({
    description: 'Subunidade (opcional para atualização)',
    example: 'Subunidade A - Atualizada',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  subUnidade?: string;

  @ApiProperty({
    description: 'Descrição da unidade (opcional para atualização)',
    example: 'Nova descrição da unidade',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({
    description: 'ID do estado da unidade (opcional para atualização)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  estadoId?: string;

  @ApiProperty({
    description: 'ID da região da unidade (opcional para atualização)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  regiaoId?: string;

  @ApiProperty({
    description: 'Código CCEE (opcional para atualização)',
    example: 'CCEE002',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  codigoCCEE?: string;

  @ApiProperty({
    description: 'CNPJ da unidade (opcional para atualização)',
    example: '12.345.678/0001-91',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiProperty({
    description: 'APE Remoto (opcional para atualização)',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  apeRemoto?: boolean;

  @ApiProperty({
    description: 'APE Local (opcional para atualização)',
    example: false,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  apeLocal?: boolean;

  @ApiProperty({
    description: 'Grupo Econômico (opcional para atualização)',
    example: 'Grupo B',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  grupoEconomico?: string;

  @ApiProperty({
    description: 'Código I5 (opcional para atualização)',
    example: 'I5002',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  codigoI5?: string;

  @ApiProperty({
    description: 'Código I0 (opcional para atualização)',
    example: 'I0002',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  codigoI0?: string;

  @ApiProperty({
    description: 'Código I100 (opcional para atualização)',
    example: 'I10002',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  codigoI100?: string;

  @ApiProperty({
    description: 'Código Conv (opcional para atualização)',
    example: 'CONV002',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  codigoConv?: string;
}
