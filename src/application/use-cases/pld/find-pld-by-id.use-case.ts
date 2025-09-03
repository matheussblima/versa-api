import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import {
  IPldRepository,
  PLD_REPOSITORY,
} from '../../../domain/repositories/pld.repository.interface';
import { PldResponseDto } from '../../dto/pld-response.dto';
import { PldMapper } from '../../mappers/pld.mapper';

@Injectable()
export class FindPldByIdUseCase {
  constructor(
    @Inject(PLD_REPOSITORY)
    private readonly pldRepository: IPldRepository,
  ) {}

  async execute(id: string): Promise<PldResponseDto> {
    const pld = await this.pldRepository.findById(id);

    if (!pld) {
      throw new NotFoundException(`PLD com ID ${id} não encontrado`);
    }

    return PldMapper.toResponseDto(pld);
  }
}
