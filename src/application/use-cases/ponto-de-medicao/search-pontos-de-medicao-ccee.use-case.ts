import { Injectable, Inject } from '@nestjs/common';
import {
  ICceePontoMedicaoService,
  CCEE_PONTO_MEDICAO_SERVICE,
} from '../../../domain/services/ccee-ponto-medicao.service';
import { PontoDeMedicaoResponseDto } from '../../dto/ponto-de-medicao-response.dto';

@Injectable()
export class SearchPontosDeMedicaoCceeUseCase {
  constructor(
    @Inject(CCEE_PONTO_MEDICAO_SERVICE)
    private readonly cceePontoMedicaoService: ICceePontoMedicaoService,
  ) {}

  async execute(subUnidadeId: string): Promise<PontoDeMedicaoResponseDto[]> {
    try {
      await this.cceePontoMedicaoService.fetchAndSavePontosMedicaoBySubUnidadeId(
        subUnidadeId,
      );

      return [
        {
          id: 'search-completed',
          codigo: 'CCEE_SEARCH',
          nome: 'Pesquisa na CCEE concluída com sucesso',
          subUnidadeId: subUnidadeId,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as PontoDeMedicaoResponseDto,
      ];
    } catch (error) {
      throw new Error(
        `Erro ao pesquisar pontos de medição na CCEE: ${error.message}`,
      );
    }
  }
}
