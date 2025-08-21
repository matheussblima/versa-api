import { Injectable, Inject } from '@nestjs/common';
import { PontoDeMedicao } from '../../../domain/entities/ponto-de-medicao.entity';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';
import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';

@Injectable()
export class FindPontosDeMedicaoByUnidadeUseCase {
  constructor(
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(unidadeId: string): Promise<PontoDeMedicao[]> {
    const subUnidades =
      await this.subUnidadeRepository.findByUnidadeId(unidadeId);

    const pontosDeMedicao: PontoDeMedicao[] = [];
    for (const subUnidade of subUnidades) {
      const pontos = await this.pontoDeMedicaoRepository.findBySubUnidadeId(
        subUnidade.id,
      );
      pontosDeMedicao.push(...pontos);
    }

    return pontosDeMedicao;
  }
}
