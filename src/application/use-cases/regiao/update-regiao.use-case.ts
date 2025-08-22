import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import {
  RegiaoRepositoryInterface,
  REGIAO_REPOSITORY,
} from '../../../domain/repositories/regiao.repository.interface';
import { UpdateRegiaoDto } from '../../dto/update-regiao.dto';
import { RegiaoResponseDto } from '../../dto/regiao-response.dto';
import { RegiaoMapper } from '../../mappers/regiao.mapper';

@Injectable()
export class UpdateRegiaoUseCase {
  constructor(
    @Inject(REGIAO_REPOSITORY)
    private readonly regiaoRepository: RegiaoRepositoryInterface,
  ) {}

  async execute(
    id: string,
    updateRegiaoDto: UpdateRegiaoDto,
  ): Promise<RegiaoResponseDto> {
    const existingRegiao = await this.regiaoRepository.findById(id);

    if (!existingRegiao) {
      throw new NotFoundException(`Região com ID ${id} não encontrada`);
    }

    const updateData = RegiaoMapper.toUpdateEntity(updateRegiaoDto);
    const updatedRegiao = await this.regiaoRepository.update(id, updateData);

    return RegiaoMapper.toResponseDto(updatedRegiao);
  }
}
