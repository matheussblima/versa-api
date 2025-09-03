import { Injectable, Inject } from '@nestjs/common';
import {
  IPldRepository,
  PLD_REPOSITORY,
} from '../../../domain/repositories/pld.repository.interface';
import { CreatePldDto } from '../../dto/create-pld.dto';
import { PldResponseDto } from '../../dto/pld-response.dto';
import { PldMapper } from '../../mappers/pld.mapper';
import { PLD } from '../../../domain/entities/pld.entity';

@Injectable()
export class CreatePldUseCase {
  constructor(
    @Inject(PLD_REPOSITORY)
    private readonly pldRepository: IPldRepository,
  ) {}

  async execute(createPldDto: CreatePldDto): Promise<PldResponseDto> {
    try {
      const entityData = PldMapper.toEntity(createPldDto);

      const exists = await this.pldRepository.existsByDataHoraAndSubmercado(
        entityData.dataHora,
        entityData.codigoSubmercado,
        entityData.tipo,
      );

      if (exists) {
        throw new Error(
          `Já existe um PLD para o submercado ${entityData.codigoSubmercado} na data/hora ${entityData.dataHora} com tipo ${entityData.tipo}`,
        );
      }

      const pld = PLD.create(
        entityData.dataHora,
        entityData.submercado,
        entityData.codigoSubmercado,
        entityData.valor,
        entityData.moeda,
        entityData.tipo,
      );

      const savedPld = await this.pldRepository.save(pld);
      return PldMapper.toResponseDto(savedPld);
    } catch (error) {
      throw new Error(`Erro ao criar PLD: ${error.message}`);
    }
  }
}
