import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import {
  IPldRepository,
  PLD_REPOSITORY,
} from '../../../domain/repositories/pld.repository.interface';
import { UpdatePldDto } from '../../dto/update-pld.dto';
import { PldResponseDto } from '../../dto/pld-response.dto';
import { PldMapper } from '../../mappers/pld.mapper';

@Injectable()
export class UpdatePldUseCase {
  constructor(
    @Inject(PLD_REPOSITORY)
    private readonly pldRepository: IPldRepository,
  ) {}

  async execute(
    id: string,
    updatePldDto: UpdatePldDto,
  ): Promise<PldResponseDto> {
    const existingPld = await this.pldRepository.findById(id);

    if (!existingPld) {
      throw new NotFoundException(`PLD com ID ${id} não encontrado`);
    }

    const updateData: {
      dataHora?: Date;
      submercado?: string;
      codigoSubmercado?: string;
      valor?: number;
      moeda?: string;
      tipo?: string;
    } = {};

    if (updatePldDto.dataHora) {
      updateData.dataHora = new Date(updatePldDto.dataHora);
    }
    if (updatePldDto.submercado) {
      updateData.submercado = updatePldDto.submercado;
    }
    if (updatePldDto.codigoSubmercado) {
      updateData.codigoSubmercado = updatePldDto.codigoSubmercado;
    }
    if (updatePldDto.valor !== undefined) {
      updateData.valor = updatePldDto.valor;
    }
    if (updatePldDto.moeda) {
      updateData.moeda = updatePldDto.moeda;
    }
    if (updatePldDto.tipo) {
      updateData.tipo = updatePldDto.tipo;
    }

    // Verificar se já existe outro PLD com a mesma data/hora, submercado e tipo
    if (updateData.dataHora || updateData.codigoSubmercado || updateData.tipo) {
      const dataHora = updateData.dataHora || existingPld.dataHora;
      const codigoSubmercado =
        updateData.codigoSubmercado || existingPld.codigoSubmercado;
      const tipo = updateData.tipo || existingPld.tipo;

      const existingPldWithSameData =
        await this.pldRepository.findByDataHoraAndSubmercado(
          dataHora,
          codigoSubmercado,
          tipo,
        );

      if (existingPldWithSameData && existingPldWithSameData.id !== id) {
        throw new ConflictException(
          `Já existe um PLD para o submercado ${codigoSubmercado} e data/hora ${dataHora.toISOString()}`,
        );
      }
    }

    const updatedPld = await this.pldRepository.update(id, updateData);

    return PldMapper.toResponseDto(updatedPld);
  }
}
