import { Injectable, Inject } from '@nestjs/common';
import { SubUnidade } from '../../../domain/entities/subunidade.entity';
import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';
import { CreateSubUnidadeDto } from '../../dto/create-subunidade.dto';
import { SubUnidadeResponseDto } from '../../dto/subunidade-response.dto';
import { SubUnidadeMapper } from '../../mappers/subunidade.mapper';

@Injectable()
export class CreateSubUnidadeUseCase {
  constructor(
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  async execute(dto: CreateSubUnidadeDto): Promise<SubUnidadeResponseDto> {
    const subUnidade = SubUnidade.create(
      dto.nome,
      dto.unidadeId,
      dto.descricao,
      dto.estadoId,
      undefined,
      dto.regiaoId,
      undefined,
      dto.apeRemoto,
      dto.apeLocal,
      dto.codigoI5,
      dto.codigoI0,
      dto.codigoI100,
      dto.codigoConv,
      dto.cnpj,
      dto.pontoDeMedicaoId,
    );

    const createdSubUnidade =
      await this.subUnidadeRepository.create(subUnidade);

    return SubUnidadeMapper.toResponseDto(createdSubUnidade);
  }
}
