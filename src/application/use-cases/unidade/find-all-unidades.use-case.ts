import { Injectable, Inject } from '@nestjs/common';
import { Unidade } from '../../../domain/entities/unidade.entity';
import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../../domain/repositories/unidade.repository.interface';

@Injectable()
export class FindAllUnidadesUseCase {
  constructor(
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
  ) {}

  async execute(): Promise<Unidade[]> {
    return await this.unidadeRepository.findAll();
  }
}
