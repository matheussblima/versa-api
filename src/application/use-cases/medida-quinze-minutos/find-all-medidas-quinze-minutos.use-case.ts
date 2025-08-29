import { Injectable, Inject } from '@nestjs/common';
import {
  IMedidaQuinzeMinutosRepository,
  MEDIDA_QUINZE_MINUTOS_REPOSITORY,
} from '../../../domain/repositories/medida-quinze-minutos.repository.interface';
import { MedidaQuinzeMinutosResponseDto } from '../../dto/medida-quinze-minutos-response.dto';
import { MedidaQuinzeMinutosMapper } from '../../mappers/medida-quinze-minutos.mapper';

@Injectable()
export class FindAllMedidasQuinzeMinutosUseCase {
  constructor(
    @Inject(MEDIDA_QUINZE_MINUTOS_REPOSITORY)
    private readonly medidaQuinzeMinutosRepository: IMedidaQuinzeMinutosRepository,
  ) {}

  async execute(
    codigoPontoMedicao?: string,
    unidadeId?: string,
  ): Promise<MedidaQuinzeMinutosResponseDto[]> {
    try {
      const medidas = await this.medidaQuinzeMinutosRepository.findAll(
        codigoPontoMedicao,
        unidadeId,
      );
      return MedidaQuinzeMinutosMapper.toResponseDtoList(medidas);
    } catch (error) {
      throw new Error(
        `Erro ao buscar medidas de quinze minutos: ${error.message}`,
      );
    }
  }
}
