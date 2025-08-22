import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsUUID } from 'class-validator';

export class CreateEstadoDto {
  @ApiProperty({
    description: 'Sigla do estado',
    example: 'SP',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  sigla: string;

  @ApiProperty({
    description: 'Nome do estado',
    example: 'São Paulo',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'ID da região',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  regiaoId: string;
}
