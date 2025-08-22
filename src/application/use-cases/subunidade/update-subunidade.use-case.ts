import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';
import { UpdateSubUnidadeDto } from '../../dto/update-subunidade.dto';
import { SubUnidadeResponseDto } from '../../dto/subunidade-response.dto';
import { SubUnidadeMapper } from '../../mappers/subunidade.mapper';

@Injectable()
export class UpdateSubUnidadeUseCase {
  constructor(
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(
    id: string,
    dto: UpdateSubUnidadeDto,
  ): Promise<SubUnidadeResponseDto> {
    const existingSubUnidade = await this.subUnidadeRepository.findById(id);
    if (!existingSubUnidade) {
      throw new NotFoundException(`Subunidade com ID ${id} não encontrada`);
    }
    const updatedSubUnidade = await this.subUnidadeRepository.update(id, dto);
    return SubUnidadeMapper.toResponseDto(updatedSubUnidade);
  }
}
