import { Injectable, Inject } from '@nestjs/common';
import {
  IMedidaQuinzeMinutosRepository,
  MEDIDA_QUINZE_MINUTOS_REPOSITORY,
} from '../../../domain/repositories/medida-quinze-minutos.repository.interface';
import { CreateMedidaQuinzeMinutosDto } from '../../dto/create-medida-quinze-minutos.dto';
import { MedidaQuinzeMinutosResponseDto } from '../../dto/medida-quinze-minutos-response.dto';
import { MedidaQuinzeMinutosMapper } from '../../mappers/medida-quinze-minutos.mapper';
import { MedidaQuinzeMinutos } from '../../../domain/entities/medida-quinze-minutos.entity';

@Injectable()
export class CreateMedidaQuinzeMinutosUseCase {
  constructor(
    @Inject(MEDIDA_QUINZE_MINUTOS_REPOSITORY)
    private readonly medidaQuinzeMinutosRepository: IMedidaQuinzeMinutosRepository,
  ) {}

  async execute(
    createMedidaQuinzeMinutosDto: CreateMedidaQuinzeMinutosDto,
  ): Promise<MedidaQuinzeMinutosResponseDto> {
    try {
      const entityData = MedidaQuinzeMinutosMapper.toEntity(
        createMedidaQuinzeMinutosDto,
      );

      const exists =
        await this.medidaQuinzeMinutosRepository.existsByPontoMedicaoAndDataHora(
          entityData.codigoPontoMedicao,
          entityData.dataHora,
        );

      if (exists) {
        throw new Error(
          `Já existe uma medida de quinze minutos para o ponto de medição ${entityData.codigoPontoMedicao} na data/hora ${entityData.dataHora}`,
        );
      }

      const medida = MedidaQuinzeMinutos.create(
        entityData.codigoPontoMedicao,
        entityData.dataHora,
        entityData.valor,
        entityData.unidade,
      );

      const savedMedida = await this.medidaQuinzeMinutosRepository.save(medida);
      return MedidaQuinzeMinutosMapper.toResponseDto(savedMedida);
    } catch (error) {
      throw new Error(
        `Erro ao criar medida de quinze minutos: ${error.message}`,
      );
    }
  }
}
