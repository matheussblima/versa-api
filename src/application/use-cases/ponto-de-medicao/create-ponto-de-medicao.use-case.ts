import { Injectable, Inject } from '@nestjs/common';
import { PontoDeMedicao } from '../../../domain/entities/ponto-de-medicao.entity';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';
import { CreatePontoDeMedicaoDto } from '../../dto/create-ponto-de-medicao.dto';
import { PontoDeMedicaoResponseDto } from '../../dto/ponto-de-medicao-response.dto';
import { PontoDeMedicaoMapper } from '../../mappers/ponto-de-medicao.mapper';

@Injectable()
export class CreatePontoDeMedicaoUseCase {
  constructor(
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
  ) {}

  async execute(
    dto: CreatePontoDeMedicaoDto,
  ): Promise<PontoDeMedicaoResponseDto> {
    const pontoDeMedicao = PontoDeMedicao.create(dto.codigo, dto.descricao);
    const createdPontoDeMedicao =
      await this.pontoDeMedicaoRepository.create(pontoDeMedicao);
    return PontoDeMedicaoMapper.toResponseDto(createdPontoDeMedicao);
  }
}
