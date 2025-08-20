import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreatePontoDeMedicaoDto {
  @ApiProperty({
    description: 'Nome do ponto de medição',
    example: 'Sensor de Temperatura 1',
    type: String,
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Descrição do ponto de medição (opcional)',
    example: 'Sensor de temperatura na linha 1',
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
