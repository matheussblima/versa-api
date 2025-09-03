import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import {
  IPldRepository,
  PLD_REPOSITORY,
} from '../../../domain/repositories/pld.repository.interface';

@Injectable()
export class DeletePldUseCase {
  constructor(
    @Inject(PLD_REPOSITORY)
    private readonly pldRepository: IPldRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existingPld = await this.pldRepository.findById(id);

    if (!existingPld) {
      throw new NotFoundException(`PLD com ID ${id} não encontrado`);
    }

    await this.pldRepository.delete(id);
  }
}
