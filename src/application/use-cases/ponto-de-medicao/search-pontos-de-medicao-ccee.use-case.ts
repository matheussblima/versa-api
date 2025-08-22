import { Injectable, Inject } from '@nestjs/common';
import {
  ICceePontoMedicaoService,
  CCEE_PONTO_MEDICAO_SERVICE,
} from '../../../domain/services/ccee-ponto-medicao.service';
import { PontoDeMedicaoCceeResponseDto } from '../../dto/ponto-de-medicao-ccee-response.dto';

@Injectable()
export class SearchPontosDeMedicaoCceeUseCase {
  constructor(
    @Inject(CCEE_PONTO_MEDICAO_SERVICE)
    private readonly cceePontoMedicaoService: ICceePontoMedicaoService,
  ) {}

  async execute(codigoCCEE: string): Promise<PontoDeMedicaoCceeResponseDto[]> {
    try {
      const pontosMedicao =
        await this.cceePontoMedicaoService.fetchPontosMedicaoByCodeCcee(
          codigoCCEE,
        );

      const pontosMedicaoResponse = pontosMedicao.map((pontoMedicao) => ({
        codigo: pontoMedicao.codigo,
        nome: pontoMedicao.descricao || pontoMedicao.codigo,
        tipoColeta: {
          codigo: pontoMedicao.codigo,
          descricao: pontoMedicao.descricao,
        },
      }));

      return pontosMedicaoResponse;
    } catch (error) {
      throw new Error(
        `Erro ao pesquisar pontos de medição na CCEE: ${error.message}`,
      );
    }
  }
}
