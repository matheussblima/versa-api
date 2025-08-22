import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CreateSubUnidadeDto {
  @ApiProperty({
    description: 'Nome da subunidade',
    example: 'Subunidade Industrial A',
    type: String,
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Descrição da subunidade',
    example: 'Subunidade principal de produção',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({
    description: 'ID do estado da subunidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID()
  estadoId?: string;

  @ApiProperty({
    description: 'ID da região da subunidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID()
  regiaoId?: string;

  @ApiProperty({
    description: 'APE Remoto',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  apeRemoto?: boolean;

  @ApiProperty({
    description: 'APE Local',
    example: false,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  apeLocal?: boolean;

  @ApiProperty({
    description: 'Código I5',
    example: 'I5001',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  codigoI5?: string;

  @ApiProperty({
    description: 'Código I0',
    example: 'I0001',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  codigoI0?: string;

  @ApiProperty({
    description: 'Código I100',
    example: 'I10001',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  codigoI100?: string;

  @ApiProperty({
    description: 'Código Conv',
    example: 'CONV001',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  codigoConv?: string;

  @ApiProperty({
    description: 'CNPJ da subunidade',
    example: '12.345.678/0001-90',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiProperty({
    description: 'ID da unidade pai',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  unidadeId: string;
}
