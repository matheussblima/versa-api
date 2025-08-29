import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Lista de itens da página atual',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: 'Número da página atual',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Quantidade de itens por página',
    example: 20,
  })
  limit: number;

  @ApiProperty({
    description: 'Total de itens',
    example: 150,
  })
  total: number;

  @ApiProperty({
    description: 'Total de páginas',
    example: 8,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Indica se existe uma página anterior',
    example: false,
  })
  hasPrevious: boolean;

  @ApiProperty({
    description: 'Indica se existe uma próxima página',
    example: true,
  })
  hasNext: boolean;
}
