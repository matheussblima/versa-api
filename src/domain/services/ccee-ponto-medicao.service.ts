import { PontoDeMedicao } from '../entities/ponto-de-medicao.entity';

export interface ICceePontoMedicaoService {
  fetchPontosMedicaoByCodeCcee(codeCcee: string): Promise<PontoDeMedicao[]>;
}

export const CCEE_PONTO_MEDICAO_SERVICE = 'CCEE_PONTO_MEDICAO_SERVICE';
