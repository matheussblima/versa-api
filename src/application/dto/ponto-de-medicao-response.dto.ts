import { ApiProperty } from '@nestjs/swagger';

export class PontoDeMedicaoResponseDto {
  @ApiProperty({
    description: 'ID único do ponto de medição',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Código do ponto de medição',
    example: 'RSPKSCALADM01',
    type: String,
  })
  codigo: string;

  @ApiProperty({
    description: 'Descrição do ponto de medição',
    example: 'SE PARKSHOPPING CANOAS - (ADM) ALIMENTADOR 1 23 KV',
    type: String,
    nullable: true,
  })
  descricao?: string;

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
