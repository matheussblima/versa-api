import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateMedidaQuinzeMinutosDto {
  @ApiProperty({
    description: 'Código do ponto de medição',
    example: 'RSPKSCALADM01',
  })
  @IsString()
  @IsNotEmpty()
  codigoPontoMedicao: string;

  @ApiProperty({
    description: 'Data e hora da medida (formato ISO)',
    example: '2024-01-15T00:15:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  dataHora: string;

  @ApiProperty({
    description: 'Valor da medida',
    example: 56.0,
  })
  @IsNumber()
  valor: number;

  @ApiProperty({
    description: 'Unidade da medida',
    example: 'kWh',
    required: false,
  })
  @IsOptional()
  @IsString()
  unidade?: string;
}
