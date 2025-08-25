import { ApiProperty } from '@nestjs/swagger';

export class MedidaCincoMinutosCceeResponseDto {
  @ApiProperty({
    description: 'Código do ponto de medição',
    example: 'RSPKSCALADM01P',
  })
  codigoPontoMedicao: string;

  @ApiProperty({
    description: 'Data e hora da medida',
    example: '2025-08-23T00:05:00-03:00',
  })
  dataHora: Date;

  @ApiProperty({
    description: 'Valor da medida',
    example: 56.0,
  })
  valor: number;

  @ApiProperty({
    description: 'Unidade da medida',
    example: 'kWh',
    required: false,
  })
  unidade?: string;
}
