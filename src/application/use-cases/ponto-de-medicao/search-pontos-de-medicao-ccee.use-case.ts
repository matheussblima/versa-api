import { Injectable, Inject } from '@nestjs/common';
import {
  ICceePontoMedicaoService,
  CCEE_PONTO_MEDICAO_SERVICE,
} from '../../../domain/services/ccee-ponto-medicao.service';
import { PontoDeMedicaoCceeResponseDto } from '../../dto/ponto-de-medicao-ccee-response.dto';
import { CceePontoMedicao } from '../../../domain/types/ccee-ponto-medicao.types';

@Injectable()
export class SearchPontosDeMedicaoCceeUseCase {
  constructor(
    @Inject(CCEE_PONTO_MEDICAO_SERVICE)
    private readonly cceePontoMedicaoService: ICceePontoMedicaoService,
  ) {}

  private mapCceeToResponseDto(
    pontoMedicao: CceePontoMedicao,
  ): PontoDeMedicaoCceeResponseDto {
    return {
      codigo: pontoMedicao['bov2:codigo'],
      nome: pontoMedicao['bov2:nome'],
      tipoColeta: {
        codigo: pontoMedicao['bov2:tipoColeta']['bov2:codigo'],
        descricao: pontoMedicao['bov2:tipoColeta']['bov2:descricao'],
      },
    };
  }

  async execute(
    subUnidadeId: string,
  ): Promise<PontoDeMedicaoCceeResponseDto[]> {
    try {
      const pontosMedicao =
        await this.cceePontoMedicaoService.fetchPontosMedicaoRawBySubUnidadeId(
          subUnidadeId,
        );

      const pontosMedicaoResponse = pontosMedicao.map((pontoMedicao) =>
        this.mapCceeToResponseDto(pontoMedicao),
      );

      return pontosMedicaoResponse;
    } catch (error) {
      throw new Error(
        `Erro ao pesquisar pontos de medição na CCEE: ${error.message}`,
      );
    }
  }
}
