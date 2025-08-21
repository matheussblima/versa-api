export interface ICceePontoMedicaoService {
  fetchAndSavePontosMedicaoBySubUnidadeId(subUnidadeId: string): Promise<void>;
}

export const CCEE_PONTO_MEDICAO_SERVICE = 'CCEE_PONTO_MEDICAO_SERVICE';
