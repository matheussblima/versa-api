import { Injectable, Inject } from '@nestjs/common';
import {
  ICceeMedidaQuinzeMinutosService,
  CCEE_MEDIDA_QUINZE_MINUTOS_SERVICE,
} from '../../../domain/services/ccee-medida-quinze-minutos.service';
import { MedidaQuinzeMinutosCceeResponseDto } from '../../dto/medida-quinze-minutos-ccee-response.dto';
import { MedidaCincoMinutosParamsDto } from '../../dto/medida-cinco-minutos-params.dto';
import { MedidaQuinzeMinutosCceeMapper } from '../../mappers/medida-quinze-minutos-ccee.mapper';

@Injectable()
export class SearchMedidasQuinzeMinutosCceeUseCase {
  constructor(
    @Inject(CCEE_MEDIDA_QUINZE_MINUTOS_SERVICE)
    private readonly cceeMedidaQuinzeMinutosService: ICceeMedidaQuinzeMinutosService,
  ) {}

  async execute(
    params: MedidaCincoMinutosParamsDto,
  ): Promise<MedidaQuinzeMinutosCceeResponseDto[]> {
    try {
      const medidas =
        await this.cceeMedidaQuinzeMinutosService.fetchMedidasQuinzeMinutos({
          codigoPontoMedicao: params.codigoPontoMedicao,
          dataReferencia: params.dataReferencia,
          numero: params.numero || 1,
          quantidadeItens: params.quantidadeItens || 500,
        });

      return MedidaQuinzeMinutosCceeMapper.toResponseDtoList(medidas);
    } catch (error) {
      throw new Error(
        `Erro ao pesquisar medidas de quinze minutos na CCEE: ${error.message}`,
      );
    }
  }
}
