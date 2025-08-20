import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUnidadeDto {
  @ApiProperty({
    description: 'Nome da unidade',
    example: 'Unidade Industrial A',
    type: String,
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Código CCEE',
    example: 'CCEE001',
    type: String,
  })
  @IsString()
  codigoCCEE: string;

  @ApiProperty({
    description: 'CNPJ da unidade',
    example: '12.345.678/0001-90',
    type: String,
  })
  @IsString()
  cnpj: string;

  @ApiProperty({
    description: 'Grupo Econômico',
    example: 'Grupo A',
    type: String,
  })
  @IsString()
  grupoEconomico: string;
}
