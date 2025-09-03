import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePldDto {
  @ApiProperty({
    description: 'Data e hora do PLD',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  dataHora: string;

  @ApiProperty({
    description: 'Nome do submercado',
    example: 'SUDESTE',
  })
  @IsString()
  @IsNotEmpty()
  submercado: string;

  @ApiProperty({
    description: 'Código do submercado',
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  codigoSubmercado: string;

  @ApiProperty({
    description: 'Valor do PLD',
    example: 39.68,
  })
  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @ApiProperty({
    description: 'Moeda do valor',
    example: 'BRL',
    default: 'BRL',
  })
  @IsString()
  moeda?: string;

  @ApiProperty({
    description: 'Tipo do PLD',
    example: 'HORARIO',
    enum: ['HORARIO', 'SEMANAL', 'MENSAL'],
    default: 'HORARIO',
  })
  @IsString()
  tipo?: string;
}
