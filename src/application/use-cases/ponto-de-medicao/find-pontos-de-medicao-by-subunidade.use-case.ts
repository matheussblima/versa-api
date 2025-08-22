import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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
export class FindPontosDeMedicaoBySubUnidadeUseCase {
  constructor(
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(subUnidadeId: string): Promise<PontoDeMedicaoResponseDto[]> {
    const subUnidade = await this.subUnidadeRepository.findById(subUnidadeId);

    if (!subUnidade) {
      throw new NotFoundException(
        `Subunidade com ID ${subUnidadeId} não encontrada`,
      );
    }

    if (!subUnidade.pontoDeMedicaoId) {
      return [];
    }

    const pontoDeMedicao = await this.pontoDeMedicaoRepository.findById(
      subUnidade.pontoDeMedicaoId,
    );

    return pontoDeMedicao
      ? [PontoDeMedicaoMapper.toResponseDto(pontoDeMedicao)]
      : [];
  }
}
