import { Injectable, Inject } from '@nestjs/common';
import {
  IMedidaQuinzeMinutosRepository,
  MEDIDA_QUINZE_MINUTOS_REPOSITORY,
} from '../../../domain/repositories/medida-quinze-minutos.repository.interface';
import { MedidaQuinzeMinutosResponseDto } from '../../dto/medida-quinze-minutos-response.dto';
import { MedidaQuinzeMinutosMapper } from '../../mappers/medida-quinze-minutos.mapper';

@Injectable()
export class FindMedidaQuinzeMinutosByIdUseCase {
  constructor(
    @Inject(MEDIDA_QUINZE_MINUTOS_REPOSITORY)
    private readonly medidaQuinzeMinutosRepository: IMedidaQuinzeMinutosRepository,
  ) {}

  async execute(id: string): Promise<MedidaQuinzeMinutosResponseDto> {
    try {
      const medida = await this.medidaQuinzeMinutosRepository.findById(id);

      if (!medida) {
        throw new Error(`Medida de quinze minutos com ID ${id} não encontrada`);
      }

      return MedidaQuinzeMinutosMapper.toResponseDto(medida);
    } catch (error) {
      throw new Error(
        `Erro ao buscar medida de quinze minutos: ${error.message}`,
      );
    }
  }
}
