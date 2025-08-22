import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import {
  EstadoRepositoryInterface,
  ESTADO_REPOSITORY,
} from '../../../domain/repositories/estado.repository.interface';
import { EstadoResponseDto } from '../../dto/estado-response.dto';
import { EstadoMapper } from '../../mappers/estado.mapper';

@Injectable()
export class FindEstadoByIdUseCase {
  constructor(
    @Inject(ESTADO_REPOSITORY)
    private readonly estadoRepository: EstadoRepositoryInterface,
  ) {}

  async execute(id: string): Promise<EstadoResponseDto> {
    const estado = await this.estadoRepository.findById(id);

    if (!estado) {
      throw new NotFoundException(`Estado com ID ${id} não encontrado`);
    }

    return EstadoMapper.toResponseDto(estado);
  }
}
