import { Injectable, Inject } from '@nestjs/common';
import {
  EstadoRepositoryInterface,
  ESTADO_REPOSITORY,
} from '../../../domain/repositories/estado.repository.interface';
import { CreateEstadoDto } from '../../dto/create-estado.dto';
import { EstadoResponseDto } from '../../dto/estado-response.dto';
import { EstadoMapper } from '../../mappers/estado.mapper';

@Injectable()
export class CreateEstadoUseCase {
  constructor(
    @Inject(ESTADO_REPOSITORY)
    private readonly estadoRepository: EstadoRepositoryInterface,
  ) {}

  async execute(createEstadoDto: CreateEstadoDto): Promise<EstadoResponseDto> {
    const estado = EstadoMapper.toEntity(createEstadoDto);
    const createdEstado = await this.estadoRepository.create(estado);
    return EstadoMapper.toResponseDto(createdEstado);
  }
}
