import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import {
  RegiaoRepositoryInterface,
  REGIAO_REPOSITORY,
} from '../../../domain/repositories/regiao.repository.interface';

@Injectable()
export class DeleteRegiaoUseCase {
  constructor(
    @Inject(REGIAO_REPOSITORY)
    private readonly regiaoRepository: RegiaoRepositoryInterface,
  ) {}

  async execute(id: string): Promise<void> {
    const existingRegiao = await this.regiaoRepository.findById(id);

    if (!existingRegiao) {
      throw new NotFoundException(`Região com ID ${id} não encontrada`);
    }

    await this.regiaoRepository.delete(id);
  }
}
