import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PontoDeMedicao } from '../../../domain/entities/ponto-de-medicao.entity';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';

@Injectable()
export class FindPontoDeMedicaoByIdUseCase {
  constructor(
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
  ) {}

  async execute(id: string): Promise<PontoDeMedicao> {
    const pontoDeMedicao = await this.pontoDeMedicaoRepository.findById(id);
    if (!pontoDeMedicao) {
      throw new NotFoundException(
        `Ponto de Medição com ID ${id} não encontrado`,
      );
    }
    return pontoDeMedicao;
  }
}
