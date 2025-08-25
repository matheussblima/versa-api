import { ApiProperty } from '@nestjs/swagger';

export class MedidaCincoMinutosResponseDto {
  @ApiProperty({
    description: 'ID único da medida',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Código do ponto de medição',
    example: 'RSPKSCALADM01',
  })
  codigoPontoMedicao: string;

  @ApiProperty({
    description: 'Data e hora da medida',
    example: '2024-01-15T10:30:00.000Z',
  })
  dataHora: Date;

  @ApiProperty({
    description: 'Valor da medida',
    example: 150.5,
  })
  valor: number;

  @ApiProperty({
    description: 'Qualidade da medida',
    example: 'GOOD',
    required: false,
  })
  qualidade?: string;

  @ApiProperty({
    description: 'Unidade da medida',
    example: 'MW',
    required: false,
  })
  unidade?: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;
}
