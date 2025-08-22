import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import {
  EstadoRepositoryInterface,
  ESTADO_REPOSITORY,
} from '../../../domain/repositories/estado.repository.interface';

@Injectable()
export class DeleteEstadoUseCase {
  constructor(
    @Inject(ESTADO_REPOSITORY)
    private readonly estadoRepository: EstadoRepositoryInterface,
  ) {}

  async execute(id: string): Promise<void> {
    const existingEstado = await this.estadoRepository.findById(id);

    if (!existingEstado) {
      throw new NotFoundException(`Estado com ID ${id} não encontrado`);
    }

    await this.estadoRepository.delete(id);
  }
}
