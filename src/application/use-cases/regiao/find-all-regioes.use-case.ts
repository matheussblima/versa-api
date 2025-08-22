import { Injectable, Inject } from '@nestjs/common';
import {
  RegiaoRepositoryInterface,
  REGIAO_REPOSITORY,
} from '../../../domain/repositories/regiao.repository.interface';
import { RegiaoResponseDto } from '../../dto/regiao-response.dto';
import { RegiaoMapper } from '../../mappers/regiao.mapper';

@Injectable()
export class FindAllRegioesUseCase {
  constructor(
    @Inject(REGIAO_REPOSITORY)
    private readonly regiaoRepository: RegiaoRepositoryInterface,
  ) {}

  async execute(): Promise<RegiaoResponseDto[]> {
    const regioes = await this.regiaoRepository.findAll();
    return regioes.map(RegiaoMapper.toResponseDto);
  }
}
