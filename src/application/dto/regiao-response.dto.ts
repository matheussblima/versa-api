import { ApiProperty } from '@nestjs/swagger';

export class RegiaoResponseDto {
  @ApiProperty({
    description: 'ID único da região',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Sigla da região',
    example: 'SE',
    type: String,
  })
  sigla: string;

  @ApiProperty({
    description: 'Nome da região',
    example: 'Sudeste',
    type: String,
  })
  nome: string;

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
