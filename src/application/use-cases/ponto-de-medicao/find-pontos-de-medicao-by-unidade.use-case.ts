import { Injectable, Inject } from '@nestjs/common';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';
import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';
import { PontoDeMedicaoResponseDto } from '../../dto/ponto-de-medicao-response.dto';
import { PontoDeMedicaoMapper } from '../../mappers/ponto-de-medicao.mapper';

@Injectable()
export class FindPontosDeMedicaoByUnidadeUseCase {
  constructor(
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(unidadeId: string): Promise<PontoDeMedicaoResponseDto[]> {
    const subUnidades =
      await this.subUnidadeRepository.findByUnidadeId(unidadeId);

    const pontosDeMedicao: PontoDeMedicaoResponseDto[] = [];
    for (const subUnidade of subUnidades) {
      if (subUnidade.pontoDeMedicaoId) {
        const pontoDeMedicao = await this.pontoDeMedicaoRepository.findById(
          subUnidade.pontoDeMedicaoId,
        );
        if (pontoDeMedicao) {
          pontosDeMedicao.push(
            PontoDeMedicaoMapper.toResponseDto(pontoDeMedicao),
          );
        }
      }
    }

    return pontosDeMedicao;
  }
}
