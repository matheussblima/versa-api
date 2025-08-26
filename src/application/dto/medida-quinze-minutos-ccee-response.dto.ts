import { ApiProperty } from '@nestjs/swagger';

export class MedidaQuinzeMinutosCceeResponseDto {
  @ApiProperty({
    description: 'Código do ponto de medição',
    example: 'RSPKSCALADM01P',
  })
  codigoPontoMedicao: string;

  @ApiProperty({
    description:
      'Data e hora da medida (arredondada para o intervalo de 15 minutos)',
    example: '2025-08-23T00:15:00-03:00',
  })
  dataHora: Date;

  @ApiProperty({
    description:
      'Valor médio da medida (calculado a partir das medidas de 5 minutos)',
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
