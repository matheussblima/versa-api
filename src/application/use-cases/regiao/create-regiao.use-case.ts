import { Injectable, Inject } from '@nestjs/common';
import {
  RegiaoRepositoryInterface,
  REGIAO_REPOSITORY,
} from '../../../domain/repositories/regiao.repository.interface';
import { CreateRegiaoDto } from '../../dto/create-regiao.dto';
import { RegiaoResponseDto } from '../../dto/regiao-response.dto';
import { RegiaoMapper } from '../../mappers/regiao.mapper';

@Injectable()
export class CreateRegiaoUseCase {
  constructor(
    @Inject(REGIAO_REPOSITORY)
    private readonly regiaoRepository: RegiaoRepositoryInterface,
  ) {}

  async execute(createRegiaoDto: CreateRegiaoDto): Promise<RegiaoResponseDto> {
    const regiao = RegiaoMapper.toEntity(createRegiaoDto);
    const createdRegiao = await this.regiaoRepository.create(regiao);
    return RegiaoMapper.toResponseDto(createdRegiao);
  }
}
