import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Unidade } from '../../../domain/entities/unidade.entity';
import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../../domain/repositories/unidade.repository.interface';

@Injectable()
export class FindUnidadeByIdUseCase {
  constructor(
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
  ) {}

  async execute(id: string): Promise<Unidade> {
    const unidade = await this.unidadeRepository.findById(id);
    if (!unidade) {
      throw new NotFoundException(`Unidade com ID ${id} não encontrada`);
    }
    return unidade;
  }
}
