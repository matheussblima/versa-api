import { Injectable, Inject } from '@nestjs/common';
import {
  IMedidaQuinzeMinutosRepository,
  MEDIDA_QUINZE_MINUTOS_REPOSITORY,
} from '../../../domain/repositories/medida-quinze-minutos.repository.interface';

@Injectable()
export class DeleteMedidaQuinzeMinutosUseCase {
  constructor(
    @Inject(MEDIDA_QUINZE_MINUTOS_REPOSITORY)
    private readonly medidaQuinzeMinutosRepository: IMedidaQuinzeMinutosRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const existingMedida =
        await this.medidaQuinzeMinutosRepository.findById(id);

      if (!existingMedida) {
        throw new Error(`Medida de quinze minutos com ID ${id} não encontrada`);
      }

      await this.medidaQuinzeMinutosRepository.delete(id);
    } catch (error) {
      throw new Error(
        `Erro ao deletar medida de quinze minutos: ${error.message}`,
      );
    }
  }
}
