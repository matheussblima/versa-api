import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllMedidasQuinzeMinutosParamsDto {
  @ApiProperty({
    description: 'Código do ponto de medição para filtrar as medidas',
    example: 'RSPKSCALADM01',
    required: false,
  })
  @IsOptional()
  @IsString()
  codigoPontoMedicao?: string;

  @ApiProperty({
    description: 'ID da unidade para filtrar as medidas',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsString()
  unidadeId?: string;

  @ApiProperty({
    description: 'Data de início para filtrar as medidas (formato: YYYY-MM-DD)',
    example: '2024-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @ApiProperty({
    description: 'Data de fim para filtrar as medidas (formato: YYYY-MM-DD)',
    example: '2024-12-31',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dataFim?: string;

  @ApiProperty({
    description: 'Número da página (padrão: 1)',
    example: 1,
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiProperty({
    description: 'Quantidade de itens por página (padrão: 20, máximo: 100)',
    example: 20,
    required: false,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;
}
