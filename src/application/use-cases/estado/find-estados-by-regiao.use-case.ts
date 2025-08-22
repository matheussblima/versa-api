import { Injectable, Inject } from '@nestjs/common';
import {
  EstadoRepositoryInterface,
  ESTADO_REPOSITORY,
} from '../../../domain/repositories/estado.repository.interface';
import { EstadoResponseDto } from '../../dto/estado-response.dto';
import { EstadoMapper } from '../../mappers/estado.mapper';

@Injectable()
export class FindEstadosByRegiaoUseCase {
  constructor(
    @Inject(ESTADO_REPOSITORY)
    private readonly estadoRepository: EstadoRepositoryInterface,
  ) {}

  async execute(regiaoId: string): Promise<EstadoResponseDto[]> {
    const estados = await this.estadoRepository.findByRegiaoId(regiaoId);
    return estados.map(EstadoMapper.toResponseDto);
  }
}
