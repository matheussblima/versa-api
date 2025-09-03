import { Injectable, Inject } from '@nestjs/common';
import {
  IPldRepository,
  PLD_REPOSITORY,
} from '../../../domain/repositories/pld.repository.interface';
import { PldPaginatedResponseDto } from '../../dto/pld-paginated-response.dto';
import { PldMapper } from '../../mappers/pld.mapper';

@Injectable()
export class FindAllPldUseCase {
  constructor(
    @Inject(PLD_REPOSITORY)
    private readonly pldRepository: IPldRepository,
  ) {}

  async execute(
    dataInicio?: string,
    dataFim?: string,
    codigoSubmercado?: string,
    tipo?: string,
    unidadeId?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PldPaginatedResponseDto> {
    const dataInicioDate = dataInicio ? new Date(dataInicio) : undefined;
    const dataFimDate = dataFim ? new Date(dataFim) : undefined;

    const { plds, total } = await this.pldRepository.findAll(
      dataInicioDate,
      dataFimDate,
      codigoSubmercado,
      tipo,
      unidadeId,
      page,
      limit,
    );

    const totalPages = Math.ceil(total / limit);

    return {
      data: plds.map((pld) => PldMapper.toResponseDto(pld)),
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };
  }
}
