import { Injectable, Inject } from '@nestjs/common';
import {
  IMedidaQuinzeMinutosRepository,
  MEDIDA_QUINZE_MINUTOS_REPOSITORY,
} from '../../../domain/repositories/medida-quinze-minutos.repository.interface';
import { UpdateMedidaQuinzeMinutosDto } from '../../dto/update-medida-quinze-minutos.dto';
import { MedidaQuinzeMinutosResponseDto } from '../../dto/medida-quinze-minutos-response.dto';
import { MedidaQuinzeMinutosMapper } from '../../mappers/medida-quinze-minutos.mapper';

@Injectable()
export class UpdateMedidaQuinzeMinutosUseCase {
  constructor(
    @Inject(MEDIDA_QUINZE_MINUTOS_REPOSITORY)
    private readonly medidaQuinzeMinutosRepository: IMedidaQuinzeMinutosRepository,
  ) {}

  async execute(
    id: string,
    updateMedidaQuinzeMinutosDto: UpdateMedidaQuinzeMinutosDto,
  ): Promise<MedidaQuinzeMinutosResponseDto> {
    try {
      const existingMedida =
        await this.medidaQuinzeMinutosRepository.findById(id);

      if (!existingMedida) {
        throw new Error(`Medida de quinze minutos com ID ${id} não encontrada`);
      }

      // Se estiver atualizando data/hora ou ponto de medição, verificar se não conflita
      if (
        updateMedidaQuinzeMinutosDto.dataHora ||
        updateMedidaQuinzeMinutosDto.codigoPontoMedicao
      ) {
        const newDataHora = updateMedidaQuinzeMinutosDto.dataHora
          ? new Date(updateMedidaQuinzeMinutosDto.dataHora)
          : existingMedida.dataHora;

        const newCodigoPontoMedicao =
          updateMedidaQuinzeMinutosDto.codigoPontoMedicao ||
          existingMedida.codigoPontoMedicao;

        const exists =
          await this.medidaQuinzeMinutosRepository.existsByPontoMedicaoAndDataHora(
            newCodigoPontoMedicao,
            newDataHora,
          );

        if (
          exists &&
          (newDataHora.getTime() !== existingMedida.dataHora.getTime() ||
            newCodigoPontoMedicao !== existingMedida.codigoPontoMedicao)
        ) {
          throw new Error(
            `Já existe uma medida de quinze minutos para o ponto de medição ${newCodigoPontoMedicao} na data/hora ${newDataHora}`,
          );
        }
      }

      const updateData = MedidaQuinzeMinutosMapper.toUpdateEntity(
        updateMedidaQuinzeMinutosDto,
      );
      const updatedMedida = await this.medidaQuinzeMinutosRepository.update(
        id,
        updateData,
      );

      return MedidaQuinzeMinutosMapper.toResponseDto(updatedMedida);
    } catch (error) {
      throw new Error(
        `Erro ao atualizar medida de quinze minutos: ${error.message}`,
      );
    }
  }
}
