import { Injectable, Inject } from '@nestjs/common';

import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';
import { SubUnidadeResponseDto } from '../../dto/subunidade-response.dto';
import { SubUnidadeMapper } from '../../mappers/subunidade.mapper';

@Injectable()
export class FindAllSubUnidadesUseCase {
  constructor(
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(): Promise<SubUnidadeResponseDto[]> {
    const subUnidades = await this.subUnidadeRepository.findAll();
    return SubUnidadeMapper.toResponseDtoList(subUnidades);
  }
}
