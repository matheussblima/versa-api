import { ApiProperty } from '@nestjs/swagger';
import { RegiaoResponseDto } from './regiao-response.dto';

export class EstadoResponseDto {
  @ApiProperty({
    description: 'ID único do estado',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Sigla do estado',
    example: 'SP',
    type: String,
  })
  sigla: string;

  @ApiProperty({
    description: 'Nome do estado',
    example: 'São Paulo',
    type: String,
  })
  nome: string;

  @ApiProperty({
    description: 'ID da região',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  regiaoId: string;

  @ApiProperty({
    description: 'Região do estado',
    type: RegiaoResponseDto,
  })
  regiao?: RegiaoResponseDto;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-01T00:00:00.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2024-01-01T00:00:00.000Z',
    type: Date,
  })
  updatedAt: Date;
}
