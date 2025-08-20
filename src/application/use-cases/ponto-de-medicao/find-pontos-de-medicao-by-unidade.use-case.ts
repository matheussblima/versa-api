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
    // Primeiro, buscar todas as subunidades da unidade
    const subUnidades =
      await this.subUnidadeRepository.findByUnidadeId(unidadeId);

    // Depois, buscar todos os pontos de medição das subunidades
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
