import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import {
  EstadoRepositoryInterface,
  ESTADO_REPOSITORY,
} from '../../../domain/repositories/estado.repository.interface';
import { UpdateEstadoDto } from '../../dto/update-estado.dto';
import { EstadoResponseDto } from '../../dto/estado-response.dto';
import { EstadoMapper } from '../../mappers/estado.mapper';

@Injectable()
export class UpdateEstadoUseCase {
  constructor(
    @Inject(ESTADO_REPOSITORY)
    private readonly estadoRepository: EstadoRepositoryInterface,
  ) {}

  async execute(
    id: string,
    updateEstadoDto: UpdateEstadoDto,
  ): Promise<EstadoResponseDto> {
    const existingEstado = await this.estadoRepository.findById(id);

    if (!existingEstado) {
      throw new NotFoundException(`Estado com ID ${id} não encontrado`);
    }

    const updateData = EstadoMapper.toUpdateEntity(updateEstadoDto);
    const updatedEstado = await this.estadoRepository.update(id, updateData);

    return EstadoMapper.toResponseDto(updatedEstado);
  }
}
