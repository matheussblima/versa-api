/**
 * Tipos para representar a estrutura de dados do ponto de medição da CCEE
 */

export interface CceeParticipanteMercadoRelacionado {
  'bov2:codigo': string;
  'bov2:nome': string;
  'bov2:tipo'?: string;
}

export interface CceeAgentesRelacionados {
  'bov2:participanteMercadoRelacionado': CceeParticipanteMercadoRelacionado[];
}

export interface CceeTipoColeta {
  'bov2:codigo': string;
  'bov2:descricao'?: string;
}

export interface CceePontoMedicao {
  /**
   * Código único do ponto de medição
   * Exemplo: 'RSPKSCALADM01'
   */
  'bov2:codigo': string;

  /**
   * Nome descritivo do ponto de medição
   * Exemplo: 'SE PARKSHOPPING CANOAS - (ADM) ALIMENTADOR 1 23 KV'
   */
  'bov2:nome': string;

  /**
   * Tipo de coleta do ponto de medição
   * Exemplo: { 'bov2:codigo': 'CLIENT' }
   */
  'bov2:tipoColeta': CceeTipoColeta;

  /**
   * Agentes relacionados ao ponto de medição
   */
  'bov2:agentesRelacionados'?: CceeAgentesRelacionados;

  /**
   * Propriedades adicionais que podem vir da API da CCEE
   */
  [key: string]: any;
}

/**
 * Resposta da API da CCEE contendo múltiplos pontos de medição
 */
export interface CceePontoMedicaoResponse {
  pontosMedicao: {
    pontoMedicao: CceePontoMedicao | CceePontoMedicao[];
  };
}

/**
 * Envelope SOAP da resposta da CCEE
 */
export interface CceeSoapResponse {
  'soapenv:Envelope': {
    'soapenv:Body': {
      'bmv2:listarPontoMedicaoResponse': CceePontoMedicaoResponse;
    };
  };
}
