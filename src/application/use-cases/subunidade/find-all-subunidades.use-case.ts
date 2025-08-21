import { Injectable, Inject } from '@nestjs/common';
import { SubUnidade } from '../../../domain/entities/subunidade.entity';
import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';

@Injectable()
export class FindAllSubUnidadesUseCase {
  constructor(
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(): Promise<SubUnidade[]> {
    return await this.subUnidadeRepository.findAll();
  }
}
