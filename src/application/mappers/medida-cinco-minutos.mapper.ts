import { MedidaCincoMinutos } from '../../domain/entities/medida-cinco-minutos.entity';
import { MedidaCincoMinutosResponseDto } from '../dto/medida-cinco-minutos-response.dto';

export class MedidaCincoMinutosMapper {
  static toResponseDto(
    medida: MedidaCincoMinutos,
  ): MedidaCincoMinutosResponseDto {
    return {
      id: medida.id,
      codigoPontoMedicao: medida.codigoPontoMedicao,
      dataHora: medida.dataHora,
      valor: medida.valor,
      unidade: medida.unidade,
      createdAt: medida.createdAt,
      updatedAt: medida.updatedAt,
    };
  }

  static toResponseDtoList(
    medidas: MedidaCincoMinutos[],
  ): MedidaCincoMinutosResponseDto[] {
    return medidas.map((medida) => this.toResponseDto(medida));
  }
}
