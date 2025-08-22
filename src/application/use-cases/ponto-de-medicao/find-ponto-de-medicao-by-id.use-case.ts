import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';
import { PontoDeMedicaoResponseDto } from '../../dto/ponto-de-medicao-response.dto';
import { PontoDeMedicaoMapper } from '../../mappers/ponto-de-medicao.mapper';

@Injectable()
export class FindPontoDeMedicaoByIdUseCase {
  constructor(
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
  ) {}

  async execute(id: string): Promise<PontoDeMedicaoResponseDto> {
    const pontoDeMedicao = await this.pontoDeMedicaoRepository.findById(id);
    if (!pontoDeMedicao) {
      throw new NotFoundException(
        `Ponto de Medição com ID ${id} não encontrado`,
      );
    }
    return PontoDeMedicaoMapper.toResponseDto(pontoDeMedicao);
  }
}
