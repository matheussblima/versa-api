import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from './paginated-response.dto';
import { PldResponseDto } from './pld-response.dto';

export class PldPaginatedResponseDto extends PaginatedResponseDto<PldResponseDto> {
  @ApiProperty({
    description: 'Lista de PLDs da página atual',
    type: [PldResponseDto],
  })
  declare data: PldResponseDto[];
}
