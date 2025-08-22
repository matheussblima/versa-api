import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';
import { SubUnidadeResponseDto } from '../../dto/subunidade-response.dto';
import { SubUnidadeMapper } from '../../mappers/subunidade.mapper';

@Injectable()
export class FindSubUnidadeByIdUseCase {
  constructor(
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(id: string): Promise<SubUnidadeResponseDto> {
    const subUnidade = await this.subUnidadeRepository.findById(id);
    if (!subUnidade) {
      throw new NotFoundException(`Subunidade com ID ${id} não encontrada`);
    }
    return SubUnidadeMapper.toResponseDto(subUnidade);
  }
}
