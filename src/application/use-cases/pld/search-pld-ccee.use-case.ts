import { Injectable, Inject } from '@nestjs/common';
import {
  ICceePldService,
  CCEE_PLD_SERVICE,
} from '../../../domain/services/ccee-pld.service';
import { PldCceeParamsDto } from '../../dto/pld-ccee-params.dto';
import { PldCceeResponseDto } from '../../dto/pld-ccee-response.dto';
import { PldMapper } from '../../mappers/pld.mapper';

@Injectable()
export class SearchPldCceeUseCase {
  constructor(
    @Inject(CCEE_PLD_SERVICE)
    private readonly cceePldService: ICceePldService,
  ) {}

  async execute(params: PldCceeParamsDto): Promise<PldCceeResponseDto[]> {
    try {
      const plds = await this.cceePldService.fetchPLD({
        dataInicio: params.dataInicio,
        dataFim: params.dataFim,
        codigoPerfilAgente: params.codigoPerfilAgente,
        tipo: params.tipo || 'HORARIO',
        numero: params.numero || 1,
        quantidadeItens: params.quantidadeItens || 50,
      });

      return plds.map((pld) => PldMapper.toResponseDto(pld));
    } catch (error) {
      throw new Error(`Erro ao buscar PLD na CCEE: ${error.message}`);
    }
  }
}
