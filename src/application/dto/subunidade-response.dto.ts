import { ApiProperty } from '@nestjs/swagger';

export class SubUnidadeResponseDto {
  @ApiProperty({
    description: 'ID da subunidade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome da subunidade',
    example: 'Subunidade Industrial A',
  })
  nome: string;

  @ApiProperty({
    description: 'Descrição da subunidade',
    example: 'Subunidade principal de produção',
    required: false,
  })
  descricao?: string;

  @ApiProperty({
    description: 'ID do estado',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  estadoId?: string;

  @ApiProperty({
    description: 'ID da região',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  regiaoId?: string;

  @ApiProperty({
    description: 'APE Remoto',
    example: true,
    required: false,
  })
  apeRemoto?: boolean;

  @ApiProperty({
    description: 'APE Local',
    example: false,
    required: false,
  })
  apeLocal?: boolean;

  @ApiProperty({
    description: 'Código I5',
    example: 'I5001',
    required: false,
  })
  codigoI5?: string;

  @ApiProperty({
    description: 'Código I0',
    example: 'I0001',
    required: false,
  })
  codigoI0?: string;

  @ApiProperty({
    description: 'Código I100',
    example: 'I10001',
    required: false,
  })
  codigoI100?: string;

  @ApiProperty({
    description: 'Código Conv',
    example: 'CONV001',
    required: false,
  })
  codigoConv?: string;

  @ApiProperty({
    description: 'CNPJ da subunidade',
    example: '12.345.678/0001-90',
    required: false,
  })
  cnpj?: string;

  @ApiProperty({
    description: 'ID da unidade pai',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  unidadeId: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
