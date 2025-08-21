import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SubUnidade } from '../../../domain/entities/subunidade.entity';
import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';
import { UpdateSubUnidadeDto } from '../../dto/update-subunidade.dto';

@Injectable()
export class UpdateSubUnidadeUseCase {
  constructor(
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(id: string, dto: UpdateSubUnidadeDto): Promise<SubUnidade> {
    const existingSubUnidade = await this.subUnidadeRepository.findById(id);
    if (!existingSubUnidade) {
      throw new NotFoundException(`Subunidade com ID ${id} não encontrada`);
    }
    return await this.subUnidadeRepository.update(id, dto);
  }
}
