import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../../domain/repositories/unidade.repository.interface';

@Injectable()
export class DeleteUnidadeUseCase {
  constructor(
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existingUnidade = await this.unidadeRepository.findById(id);
    if (!existingUnidade) {
      throw new NotFoundException(`Unidade com ID ${id} não encontrada`);
    }
    await this.unidadeRepository.delete(id);
  }
}
