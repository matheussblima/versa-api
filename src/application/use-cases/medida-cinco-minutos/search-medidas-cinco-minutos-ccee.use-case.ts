import { Injectable, Inject } from '@nestjs/common';
import {
  ICceeMedidaCincoMinutosService,
  CCEE_MEDIDA_CINCO_MINUTOS_SERVICE,
} from '../../../domain/services/ccee-medida-cinco-minutos.service';
import { MedidaCincoMinutosCceeResponseDto } from '../../dto/medida-cinco-minutos-ccee-response.dto';
import { MedidaCincoMinutosParamsDto } from '../../dto/medida-cinco-minutos-params.dto';
import { MedidaCincoMinutosCceeMapper } from '../../mappers/medida-cinco-minutos-ccee.mapper';

@Injectable()
export class SearchMedidasCincoMinutosCceeUseCase {
  constructor(
    @Inject(CCEE_MEDIDA_CINCO_MINUTOS_SERVICE)
    private readonly cceeMedidaCincoMinutosService: ICceeMedidaCincoMinutosService,
  ) {}

  async execute(
    params: MedidaCincoMinutosParamsDto,
  ): Promise<MedidaCincoMinutosCceeResponseDto[]> {
    try {
      const medidas =
        await this.cceeMedidaCincoMinutosService.fetchMedidasCincoMinutos({
          codigoPontoMedicao: params.codigoPontoMedicao,
          dataReferencia: params.dataReferencia,
          numero: params.numero || 1,
          quantidadeItens: params.quantidadeItens || 500,
        });

      return MedidaCincoMinutosCceeMapper.toResponseDtoList(medidas);
    } catch (error) {
      throw new Error(
        `Erro ao pesquisar medidas de cinco minutos na CCEE: ${error.message}`,
      );
    }
  }
}
