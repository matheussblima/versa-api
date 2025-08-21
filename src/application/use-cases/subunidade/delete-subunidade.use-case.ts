import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';

@Injectable()
export class DeleteSubUnidadeUseCase {
  constructor(
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(id: string): Promise<void> {
    const existingSubUnidade = await this.subUnidadeRepository.findById(id);
    if (!existingSubUnidade) {
      throw new NotFoundException(`Subunidade com ID ${id} não encontrada`);
    }
    await this.subUnidadeRepository.delete(id);
  }
}
