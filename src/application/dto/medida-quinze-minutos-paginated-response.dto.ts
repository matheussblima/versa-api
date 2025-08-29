import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from './paginated-response.dto';
import { MedidaQuinzeMinutosResponseDto } from './medida-quinze-minutos-response.dto';

export class MedidaQuinzeMinutosPaginatedResponseDto extends PaginatedResponseDto<MedidaQuinzeMinutosResponseDto> {
  @ApiProperty({
    description: 'Lista de medidas de quinze minutos da página atual',
    type: [MedidaQuinzeMinutosResponseDto],
  })
  declare data: MedidaQuinzeMinutosResponseDto[];
}
