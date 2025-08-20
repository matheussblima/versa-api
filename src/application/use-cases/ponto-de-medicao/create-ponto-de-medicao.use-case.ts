import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PontoDeMedicao } from '../../../domain/entities/ponto-de-medicao.entity';
import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';
import { CreatePontoDeMedicaoDto } from '../../dto/create-ponto-de-medicao.dto';

@Injectable()
export class CreatePontoDeMedicaoUseCase {
  constructor(
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(dto: CreatePontoDeMedicaoDto): Promise<PontoDeMedicao> {
    // Verificar se a subunidade existe
    const subUnidade = await this.subUnidadeRepository.findById(
      dto.subUnidadeId,
    );
    if (!subUnidade) {
      throw new NotFoundException(
        `Subunidade com ID ${dto.subUnidadeId} não encontrada`,
      );
    }

    const pontoDeMedicao = PontoDeMedicao.create(
      dto.nome,
      dto.subUnidadeId,
      dto.descricao,
    );
    return await this.pontoDeMedicaoRepository.create(pontoDeMedicao);
  }
}
