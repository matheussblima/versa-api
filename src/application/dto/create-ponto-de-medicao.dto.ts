import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

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

  @ApiProperty({
    description: 'ID da subunidade onde o ponto de medição está localizado',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  subUnidadeId: string;
}
