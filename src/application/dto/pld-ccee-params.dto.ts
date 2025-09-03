import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PldCceeParamsDto {
  @ApiProperty({
    description: 'Data de início para consulta (formato ISO)',
    example: '2024-01-15T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  dataInicio: string;

  @ApiProperty({
    description: 'Data de fim para consulta (formato ISO)',
    example: '2024-01-15T23:59:59.999Z',
  })
  @IsDateString()
  @IsNotEmpty()
  dataFim: string;

  @ApiProperty({
    description: 'Código do perfil do agente na CCEE',
    example: 'AGENTE_001',
  })
  @IsString()
  @IsNotEmpty()
  codigoPerfilAgente: string;

  @ApiProperty({
    description: 'Tipo do PLD',
    example: 'HORARIO',
    enum: ['HORARIO', 'SEMANAL', 'MENSAL'],
    default: 'HORARIO',
    required: false,
  })
  @IsString()
  @IsOptional()
  tipo?: string;

  @ApiProperty({
    description: 'Número da página (padrão: 1)',
    example: 1,
    required: false,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  numero?: number;

  @ApiProperty({
    description: 'Quantidade de itens por página (padrão: 50, máximo: 1000)',
    example: 50,
    required: false,
  })
  @IsNumber()
  @Min(1)
  @Max(1000)
  @IsOptional()
  quantidadeItens?: number;
}
