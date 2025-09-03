import { ApiProperty } from '@nestjs/swagger';

export class PldCceeResponseDto {
  @ApiProperty({
    description: 'ID único do PLD',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Data e hora do PLD',
    example: '2024-01-15T10:00:00.000Z',
  })
  dataHora: string;

  @ApiProperty({
    description: 'Nome do submercado',
    example: 'SUDESTE',
  })
  submercado: string;

  @ApiProperty({
    description: 'Código do submercado',
    example: '1',
  })
  codigoSubmercado: string;

  @ApiProperty({
    description: 'Valor do PLD',
    example: 39.68,
  })
  valor: number;

  @ApiProperty({
    description: 'Moeda do valor',
    example: 'BRL',
  })
  moeda: string;

  @ApiProperty({
    description: 'Tipo do PLD',
    example: 'HORARIO',
    enum: ['HORARIO', 'SEMANAL', 'MENSAL'],
  })
  tipo: string;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2024-01-15T10:00:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização do registro',
    example: '2024-01-15T10:00:00.000Z',
  })
  updatedAt: string;
}
