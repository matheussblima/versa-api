import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import {
  RegiaoRepositoryInterface,
  REGIAO_REPOSITORY,
} from '../../../domain/repositories/regiao.repository.interface';
import { RegiaoResponseDto } from '../../dto/regiao-response.dto';
import { RegiaoMapper } from '../../mappers/regiao.mapper';

@Injectable()
export class FindRegiaoByIdUseCase {
  constructor(
    @Inject(REGIAO_REPOSITORY)
    private readonly regiaoRepository: RegiaoRepositoryInterface,
  ) {}

  async execute(id: string): Promise<RegiaoResponseDto> {
    const regiao = await this.regiaoRepository.findById(id);

    if (!regiao) {
      throw new NotFoundException(`Região com ID ${id} não encontrada`);
    }

    return RegiaoMapper.toResponseDto(regiao);
  }
}
