import { Injectable, Inject } from '@nestjs/common';

import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../../domain/repositories/unidade.repository.interface';
import { UnidadeResponseDto } from '../../dto/unidade-response.dto';
import { UnidadeMapper } from '../../mappers/unidade.mapper';

@Injectable()
export class FindAllUnidadesUseCase {
  constructor(
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
  ) {}

  async execute(): Promise<UnidadeResponseDto[]> {
    const unidades = await this.unidadeRepository.findAll();
    return UnidadeMapper.toResponseDtoList(unidades);
  }
}
