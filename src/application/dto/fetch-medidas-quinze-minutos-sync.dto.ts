import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class FetchMedidasQuinzeMinutosSyncDto {
  @ApiProperty({
    description:
      'Data de referência para busca (formato YYYY-MM-DD ou ISO dateTime)',
    example: '2024-01-15',
  })
  @IsString()
  @IsDateString()
  referenceDate: string;

  @ApiProperty({
    description:
      'Código do ponto de medição (opcional - se não informado, busca todos os pontos)',
    example: 'RSPKSCALADM01',
    required: false,
  })
  @IsOptional()
  @IsString()
  measurementPointCode?: string;

  @ApiProperty({
    description:
      'Força atualização mesmo se já existirem medidas para a data (padrão: false)',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  forceUpdate?: boolean;
}

export class FetchMedidasQuinzeMinutosSyncResponseDto {
  @ApiProperty({
    description: 'Total de pontos de medição processados',
    example: 5,
  })
  totalPoints: number;

  @ApiProperty({
    description: 'Total de medições salvas',
    example: 1500,
  })
  totalMeasures: number;

  @ApiProperty({
    description: 'Número de pontos processados com sucesso',
    example: 4,
  })
  processedPoints: number;

  @ApiProperty({
    description: 'Número de pontos pulados (já tinham medidas)',
    example: 1,
  })
  skippedPoints: number;

  @ApiProperty({
    description: 'Lista de erros encontrados',
    example: ['Ponto RSPKSCALADM01: Erro de conexão'],
  })
  errors: string[];

  @ApiProperty({
    description: 'Detalhes de cada ponto processado',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        pointCode: { type: 'string', example: 'RSPKSCALADM01' },
        measuresFound: { type: 'number', example: 96 },
        measuresSaved: { type: 'number', example: 96 },
        error: { type: 'string', example: 'Erro de conexão' },
      },
    },
  })
  details: {
    pointCode: string;
    measuresFound: number;
    measuresSaved: number;
    error?: string;
  }[];
}
