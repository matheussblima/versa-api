import { ApiProperty } from '@nestjs/swagger';

export class UnidadeResponseDto {
  @ApiProperty({
    description: 'ID único da unidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Nome da unidade',
    example: 'Unidade Industrial A',
    type: String,
  })
  nome: string;

  @ApiProperty({
    description: 'Código CCEE',
    example: 'CCEE001',
    type: String,
  })
  codigoCCEE: string;

  @ApiProperty({
    description: 'CNPJ da unidade',
    example: '12.345.678/0001-90',
    type: String,
  })
  cnpj: string;

  @ApiProperty({
    description: 'Grupo Econômico',
    example: 'Grupo A',
    type: String,
  })
  grupoEconomico: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-01T00:00:00.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2024-01-01T00:00:00.000Z',
    type: Date,
  })
  updatedAt: Date;
}
