export interface CceePldParams {
  dataInicio: string;
  dataFim: string;
  codigoPerfilAgente: string;
  tipo?: string;
  numero?: number;
  quantidadeItens?: number;
}

export interface CceePldValor {
  indicadorRedeEletrica: boolean;
  submercado: {
    codigo: string;
    nome: string;
  };
  tipo: string;
  valor: {
    codigo: string;
    valor: string;
  };
}

export interface CceePld {
  vigencia: {
    inicio: string;
    fim: string;
  };
  valores: CceePldValor[];
}

export interface CceePldResponse {
  plds: {
    pld: CceePld[];
  };
}

export interface CceePldSoapResponse {
  'soapenv:Envelope': {
    'soapenv:Header': {
      'mh:messageHeader': {
        'mh:codigoPerfilAgente': string;
        'mh:transactionId': string;
      };
      'hdr:paginacao': {
        'hdr:numero': string;
        'hdr:quantidadeItens': string;
        'hdr:totalPaginas': string;
        'hdr:quantidadeTotalItens': string;
      };
    };
    'soapenv:Body': {
      'bm:listarPLDResponse': CceePldResponse;
    };
  };
}
