import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PontoDeMedicao } from '../../../domain/entities/ponto-de-medicao.entity';
import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../../domain/repositories/unidade.repository.interface';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';
import { UpdatePontoDeMedicaoDto } from '../../dto/update-ponto-de-medicao.dto';

@Injectable()
export class UpdatePontoDeMedicaoUseCase {
  constructor(
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdatePontoDeMedicaoDto,
  ): Promise<PontoDeMedicao> {
    const existingPontoDeMedicao =
      await this.pontoDeMedicaoRepository.findById(id);
    if (!existingPontoDeMedicao) {
      throw new NotFoundException(
        `Ponto de Medição com ID ${id} não encontrado`,
      );
    }

    // Se estiver atualizando a unidade, verificar se ela existe
    if (dto.unidadeId) {
      const unidade = await this.unidadeRepository.findById(dto.unidadeId);
      if (!unidade) {
        throw new NotFoundException(
          `Unidade com ID ${dto.unidadeId} não encontrada`,
        );
      }
    }

    return await this.pontoDeMedicaoRepository.update(id, dto);
  }
}
