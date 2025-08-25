import { MedidaCincoMinutos } from '../../domain/entities/medida-cinco-minutos.entity';
import { MedidaCincoMinutosCceeResponseDto } from '../dto/medida-cinco-minutos-ccee-response.dto';

export class MedidaCincoMinutosCceeMapper {
  static toResponseDto(
    medida: MedidaCincoMinutos,
  ): MedidaCincoMinutosCceeResponseDto {
    return {
      codigoPontoMedicao: medida.codigoPontoMedicao,
      dataHora: medida.dataHora,
      valor: medida.valor,
      unidade: medida.unidade,
    };
  }

  static toResponseDtoList(
    medidas: MedidaCincoMinutos[],
  ): MedidaCincoMinutosCceeResponseDto[] {
    return medidas.map((medida) => this.toResponseDto(medida));
  }
}
