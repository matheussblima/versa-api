import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MedidaQuinzeMinutosParamsDto {
  @ApiProperty({
    description: 'Código do ponto de medição',
    example: 'RSPKSCALADM01',
  })
  @IsString()
  @IsNotEmpty()
  codigoPontoMedicao: string;

  @ApiProperty({
    description: 'Data de referência para consulta (formato ISO)',
    example: '2024-01-15T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  dataReferencia: string;

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
  numero?: number;

  @ApiProperty({
    description: 'Quantidade de itens por página (padrão: 500, máximo: 1000)',
    example: 500,
    required: false,
    minimum: 1,
    maximum: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(1000)
  quantidadeItens?: number;
}
