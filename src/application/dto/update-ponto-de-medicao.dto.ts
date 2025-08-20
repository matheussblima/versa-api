import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';
import { CreatePontoDeMedicaoDto } from './create-ponto-de-medicao.dto';

export class UpdatePontoDeMedicaoDto extends PartialType(
  CreatePontoDeMedicaoDto,
) {
  @ApiProperty({
    description: 'Nome do ponto de medição (opcional para atualização)',
    example: 'Sensor de Temperatura 1 - Atualizado',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({
    description: 'Descrição do ponto de medição (opcional para atualização)',
    example: 'Nova descrição do sensor',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({
    description: 'Subunidade (opcional para atualização)',
    example: 'Linha de Produção 2',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  subunidade?: string;

  @ApiProperty({
    description: 'ID da unidade (opcional para atualização)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID()
  unidadeId?: string;
}
