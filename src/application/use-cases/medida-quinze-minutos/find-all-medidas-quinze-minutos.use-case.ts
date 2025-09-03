import { Injectable, Inject } from '@nestjs/common';
import {
  IMedidaQuinzeMinutosRepository,
  MEDIDA_QUINZE_MINUTOS_REPOSITORY,
} from '../../../domain/repositories/medida-quinze-minutos.repository.interface';
import { MedidaQuinzeMinutosMapper } from '../../mappers/medida-quinze-minutos.mapper';
import { MedidaQuinzeMinutosPaginatedResponseDto } from '../../dto/medida-quinze-minutos-paginated-response.dto';

@Injectable()
export class FindAllMedidasQuinzeMinutosUseCase {
  constructor(
    @Inject(MEDIDA_QUINZE_MINUTOS_REPOSITORY)
    private readonly medidaQuinzeMinutosRepository: IMedidaQuinzeMinutosRepository,
  ) {}

  async execute(
    codigoPontoMedicao?: string,
    unidadeId?: string,
    dataInicio?: string,
    dataFim?: string,
    page?: number,
    limit?: number,
  ): Promise<MedidaQuinzeMinutosPaginatedResponseDto> {
    try {
      const result = await this.medidaQuinzeMinutosRepository.findAll(
        codigoPontoMedicao,
        unidadeId,
        dataInicio,
        dataFim,
        page,
        limit,
      );

      const pageNumber = page || 1;
      const pageSize = limit || 20;
      const totalPages = Math.ceil(result.total / pageSize);

      return {
        data: MedidaQuinzeMinutosMapper.toResponseDtoList(result.data),
        page: pageNumber,
        limit: pageSize,
        total: result.total,
        totalPages,
        hasPrevious: pageNumber > 1,
        hasNext: pageNumber < totalPages,
      };
    } catch (error) {
      throw new Error(
        `Erro ao buscar medidas de quinze minutos: ${error.message}`,
      );
    }
  }
}
