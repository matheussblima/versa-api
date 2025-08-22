import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatePontoDeMedicaoDto {
  @ApiProperty({
    description: 'Código único do ponto de medição',
    example: 'RSPKSCALADM01',
    type: String,
  })
  @IsString()
  codigo: string;

  @ApiProperty({
    description: 'Descrição do ponto de medição (opcional)',
    example: 'SE PARKSHOPPING CANOAS - (ADM) ALIMENTADOR 1 23 KV',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  descricao?: string;
}
