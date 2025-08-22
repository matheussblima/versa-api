import { PontoDeMedicao } from '../entities/ponto-de-medicao.entity';
import { CceePontoMedicao } from '../types/ccee-ponto-medicao.types';

export interface ICceePontoMedicaoService {
  fetchPontosMedicaoBySubUnidadeId(
    subUnidadeId: string,
  ): Promise<PontoDeMedicao[]>;
  fetchPontosMedicaoByCodeCcee(codeCcee: string): Promise<PontoDeMedicao[]>;
  fetchPontosMedicaoRawBySubUnidadeId(
    subUnidadeId: string,
  ): Promise<CceePontoMedicao[]>;
}

export const CCEE_PONTO_MEDICAO_SERVICE = 'CCEE_PONTO_MEDICAO_SERVICE';
