import { ApiProperty } from '@nestjs/swagger';

export class FetchPldSyncResponseDto {
  @ApiProperty({
    description: 'Data de referência processada',
    example: '2024-01-01',
  })
  referenceDate: string;

  @ApiProperty({
    description: 'Total de registros PLD encontrados',
    example: 96,
  })
  totalRecords: number;

  @ApiProperty({
    description: 'Total de registros PLD salvos',
    example: 96,
  })
  savedRecords: number;

  @ApiProperty({
    description: 'Registros pulados (já existiam)',
    example: 0,
  })
  skippedRecords: number;

  @ApiProperty({
    description: 'Lista de erros encontrados',
    example: [],
  })
  errors: string[];

  @ApiProperty({
    description: 'Data e hora de início do processamento',
    example: '2024-01-01T00:00:00.000Z',
  })
  startedAt: string;

  @ApiProperty({
    description: 'Data e hora de fim do processamento',
    example: '2024-01-01T00:00:00.000Z',
  })
  finishedAt: string;

  @ApiProperty({
    description: 'Tempo total de processamento em milissegundos',
    example: 1500,
  })
  processingTimeMs: number;
}
