import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SubUnidade } from '../../../domain/entities/subunidade.entity';
import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';

@Injectable()
export class FindSubUnidadeByIdUseCase {
  constructor(
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(id: string): Promise<SubUnidade> {
    const subUnidade = await this.subUnidadeRepository.findById(id);
    if (!subUnidade) {
      throw new NotFoundException(`Subunidade com ID ${id} não encontrada`);
    }
    return subUnidade;
  }
}
