import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../../domain/repositories/unidade.repository.interface';
import { UpdateUnidadeDto } from '../../dto/update-unidade.dto';
import { UnidadeResponseDto } from '../../dto/unidade-response.dto';
import { UnidadeMapper } from '../../mappers/unidade.mapper';

@Injectable()
export class UpdateUnidadeUseCase {
  constructor(
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateUnidadeDto,
  ): Promise<UnidadeResponseDto> {
    const existingUnidade = await this.unidadeRepository.findById(id);
    if (!existingUnidade) {
      throw new NotFoundException(`Unidade com ID ${id} não encontrada`);
    }
    const updatedUnidade = await this.unidadeRepository.update(id, dto);
    return UnidadeMapper.toResponseDto(updatedUnidade);
  }
}
