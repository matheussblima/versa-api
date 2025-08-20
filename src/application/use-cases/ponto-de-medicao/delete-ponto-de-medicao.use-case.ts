import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';

@Injectable()
export class DeletePontoDeMedicaoUseCase {
  constructor(
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existingPontoDeMedicao =
      await this.pontoDeMedicaoRepository.findById(id);
    if (!existingPontoDeMedicao) {
      throw new NotFoundException(
        `Ponto de Medição com ID ${id} não encontrado`,
      );
    }
    await this.pontoDeMedicaoRepository.delete(id);
  }
}
