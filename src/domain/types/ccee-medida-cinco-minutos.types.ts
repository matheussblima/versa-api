/**
 * Tipos para representar a estrutura de dados das medidas de cinco minutos da CCEE
 */

export interface CceeMedidaCincoMinutos {
  /**
   * Medidor relacionado à medida
   */
  'bov2:medidor'?: {
    'bov2:codigo': string;
  };

  /**
   * Data da medida
   * Exemplo: '2025-08-23T00:05:00-03:00'
   */
  'bov2:data'?: string;

  /**
   * Energia ativa (consumo e geração)
   */
  'bov2:energiaAtiva'?: {
    'bov2:consumo'?: {
      'bov2:valor': string;
      'bov2:unidadeMedida': string;
    };
    'bov2:geracao'?: {
      'bov2:valor': string;
      'bov2:unidadeMedida': string;
    };
  };

  /**
   * Energia reativa (consumo e geração)
   */
  'bov2:energiaReativa'?: {
    'bov2:consumo'?: {
      'bov2:valor': string;
      'bov2:unidadeMedida': string;
    };
    'bov2:geracao'?: {
      'bov2:valor': string;
      'bov2:unidadeMedida': string;
    };
  };

  /**
   * Propriedades adicionais que podem vir da API da CCEE
   */
  [key: string]: any;
}

/**
 * Resposta da API da CCEE contendo múltiplas medidas de cinco minutos
 */
export interface CceeMedidaCincoMinutosResponse {
  'bmv2:medidas': {
    'bov2:medida': CceeMedidaCincoMinutos | CceeMedidaCincoMinutos[];
  };
}

/**
 * Envelope SOAP da resposta da CCEE para medidas de cinco minutos
 */
export interface CceeMedidaCincoMinutosSoapResponse {
  'soapenv:Envelope': {
    'soapenv:Body': {
      'bmv2:listarMedidaCincoMinutosResponse': CceeMedidaCincoMinutosResponse;
    };
  };
}

/**
 * Parâmetros para consulta de medidas de cinco minutos
 */
export interface CceeMedidaCincoMinutosParams {
  codigoPontoMedicao: string;
  dataReferencia: string;
  numero?: number;
  quantidadeItens?: number;
}
