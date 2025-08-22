import { ApiProperty } from '@nestjs/swagger';

export class TipoColetaDto {
  @ApiProperty({
    description: 'Código do tipo de coleta',
    example: 'CLIENT',
    type: String,
  })
  codigo: string;

  @ApiProperty({
    description: 'Descrição do tipo de coleta',
    example: 'Cliente',
    type: String,
    nullable: true,
  })
  descricao?: string;
}

export class PontoDeMedicaoCceeResponseDto {
  @ApiProperty({
    description: 'Código do ponto de medição',
    example: 'RSPKSCALADM01',
    type: String,
  })
  codigo: string;

  @ApiProperty({
    description: 'Nome do ponto de medição',
    example: 'SE PARKSHOPPING CANOAS - (ADM) ALIMENTADOR 1 23 KV',
    type: String,
  })
  nome: string;

  @ApiProperty({
    description: 'Tipo de coleta do ponto de medição',
    type: TipoColetaDto,
  })
  tipoColeta: TipoColetaDto;
}
