import { MedidaQuinzeMinutos } from '../../domain/entities/medida-quinze-minutos.entity';
import { MedidaQuinzeMinutosResponseDto } from '../dto/medida-quinze-minutos-response.dto';
import { CreateMedidaQuinzeMinutosDto } from '../dto/create-medida-quinze-minutos.dto';
import { UpdateMedidaQuinzeMinutosDto } from '../dto/update-medida-quinze-minutos.dto';

export class MedidaQuinzeMinutosMapper {
  static toResponseDto(
    medida: MedidaQuinzeMinutos,
  ): MedidaQuinzeMinutosResponseDto {
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
    medidas: MedidaQuinzeMinutos[],
  ): MedidaQuinzeMinutosResponseDto[] {
    return medidas.map(this.toResponseDto);
  }

  static toEntity(
    dto: CreateMedidaQuinzeMinutosDto,
  ): Omit<MedidaQuinzeMinutos, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      codigoPontoMedicao: dto.codigoPontoMedicao,
      dataHora: new Date(dto.dataHora),
      valor: dto.valor,
      unidade: dto.unidade,
    };
  }

  static toUpdateEntity(
    dto: UpdateMedidaQuinzeMinutosDto,
  ): Partial<Omit<MedidaQuinzeMinutos, 'id' | 'createdAt' | 'updatedAt'>> {
    const updateData: any = {};

    if (dto.codigoPontoMedicao !== undefined) {
      updateData.codigoPontoMedicao = dto.codigoPontoMedicao;
    }

    if (dto.dataHora !== undefined) {
      updateData.dataHora = new Date(dto.dataHora);
    }

    if (dto.valor !== undefined) {
      updateData.valor = dto.valor;
    }

    if (dto.unidade !== undefined) {
      updateData.unidade = dto.unidade;
    }

    return updateData;
  }
}
