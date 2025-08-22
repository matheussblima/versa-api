import { Injectable, Inject } from '@nestjs/common';
import { Unidade } from '../../../domain/entities/unidade.entity';
import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../../domain/repositories/unidade.repository.interface';
import { CreateUnidadeDto } from '../../dto/create-unidade.dto';

@Injectable()
export class CreateUnidadeUseCase {
  constructor(
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
  ) {}

  async execute(dto: CreateUnidadeDto): Promise<Unidade> {
    const unidade = Unidade.create(
      dto.nome,
      dto.codigoCCEE,
      dto.grupoEconomico,
    );
    return await this.unidadeRepository.create(unidade);
  }
}
