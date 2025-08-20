import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Unidade } from '../../../domain/entities/unidade.entity';
import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../../domain/repositories/unidade.repository.interface';
import { UpdateUnidadeDto } from '../../dto/update-unidade.dto';

@Injectable()
export class UpdateUnidadeUseCase {
  constructor(
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
  ) {}

  async execute(id: string, dto: UpdateUnidadeDto): Promise<Unidade> {
    const existingUnidade = await this.unidadeRepository.findById(id);
    if (!existingUnidade) {
      throw new NotFoundException(`Unidade com ID ${id} não encontrada`);
    }
    return await this.unidadeRepository.update(id, dto);
  }
}
