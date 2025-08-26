import { Injectable, Inject } from '@nestjs/common';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';
import { PontoDeMedicaoResponseDto } from '../../dto/ponto-de-medicao-response.dto';
import { PontoDeMedicaoMapper } from '../../mappers/ponto-de-medicao.mapper';

@Injectable()
export class FindAvailablePontosDeMedicaoUseCase {
  constructor(
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoDeMedicaoRepository: IPontoDeMedicaoRepository,
  ) {}

  async execute(): Promise<PontoDeMedicaoResponseDto[]> {
    const pontosDeMedicao = await this.pontoDeMedicaoRepository.findAvailable();
    return PontoDeMedicaoMapper.toResponseDtoList(pontosDeMedicao);
  }
}
