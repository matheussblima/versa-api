import { MedidaQuinzeMinutos } from '../../domain/entities/medida-quinze-minutos.entity';
import { MedidaQuinzeMinutosCceeResponseDto } from '../dto/medida-quinze-minutos-ccee-response.dto';

export class MedidaQuinzeMinutosCceeMapper {
  static toResponseDto(
    medida: MedidaQuinzeMinutos,
  ): MedidaQuinzeMinutosCceeResponseDto {
    return {
      codigoPontoMedicao: medida.codigoPontoMedicao,
      dataHora: medida.dataHora,
      valor: medida.valor,
      unidade: medida.unidade,
    };
  }

  static toResponseDtoList(
    medidas: MedidaQuinzeMinutos[],
  ): MedidaQuinzeMinutosCceeResponseDto[] {
    return medidas.map((medida) => this.toResponseDto(medida));
  }
}
