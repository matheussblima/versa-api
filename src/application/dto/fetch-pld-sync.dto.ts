import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FetchPldSyncDto {
  @ApiProperty({
    description: 'Data de referência para buscar PLD (formato YYYY-MM-DD)',
    example: '2024-01-01',
  })
  @IsDateString()
  @IsNotEmpty()
  referenceDate: string;

  @ApiProperty({
    description: 'Forçar atualização mesmo se já existir dados para a data',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  forceUpdate?: boolean;

  @ApiProperty({
    description: 'Tipo do PLD',
    example: 'HORARIO',
    enum: ['HORARIO', 'SEMANAL', 'MENSAL'],
    default: 'HORARIO',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipo?: string;
}
