import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../../domain/repositories/unidade.repository.interface';
import { UnidadeResponseDto } from '../../dto/unidade-response.dto';
import { UnidadeMapper } from '../../mappers/unidade.mapper';

@Injectable()
export class FindUnidadeByIdUseCase {
  constructor(
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
  ) {}

  async execute(id: string): Promise<UnidadeResponseDto> {
    const unidade = await this.unidadeRepository.findById(id);
    if (!unidade) {
      throw new NotFoundException(`Unidade com ID ${id} não encontrada`);
    }
    return UnidadeMapper.toResponseDto(unidade);
  }
}
