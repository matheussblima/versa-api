import { Injectable } from '@nestjs/common';
import { CceeApiService } from './ccee-api.service';
import { MedidaCincoMinutos } from '../../domain/entities/medida-cinco-minutos.entity';
import * as xml2js from 'xml2js';
import { ICceeMedidaCincoMinutosService } from '../../domain/services/ccee-medida-cinco-minutos.service';
import {
  CceeMedidaCincoMinutos,
  CceeMedidaCincoMinutosSoapResponse,
  CceeMedidaCincoMinutosParams,
} from '../../domain/types/ccee-medida-cinco-minutos.types';

@Injectable()
export class CceeMedidaCincoMinutosService
  implements ICceeMedidaCincoMinutosService
{
  constructor(private readonly cceeApiService: CceeApiService) {}

  private buildSoapEnvelope(params: CceeMedidaCincoMinutosParams): string {
    const username = process.env.CCEE_USERNAME || '';
    const password = process.env.CCEE_PASSWORD || '';
    const numero = params.numero || 1;
    const quantidadeItens = params.quantidadeItens || 500;

    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mh="http://xmlns.energia.org.br/MH/v2" xmlns:oas="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:bm="http://xmlns.energia.org.br/BM/v2" xmlns:bo="http://xmlns.energia.org.br/BO/v2">
   <soapenv:Header>
      <mh:messageHeader>
         <mh:codigoPerfilAgente>${params.codigoPerfilAgente}</mh:codigoPerfilAgente>
      </mh:messageHeader>
      <oas:Security>
         <oas:UsernameToken>
            <oas:Username>${username}</oas:Username>
            <oas:Password>${password}</oas:Password>
         </oas:UsernameToken>
      </oas:Security>
      <mh:paginacao>
         <mh:numero>${numero}</mh:numero>
         <mh:quantidadeItens>${quantidadeItens}</mh:quantidadeItens>
      </mh:paginacao>
   </soapenv:Header>
   <soapenv:Body>
      <bm:listarMedidaCincoMinutosRequest>
         <bm:dataReferencia>${params.dataReferencia}</bm:dataReferencia>
         <bm:medidor>
            <bo:codigo>${params.codigoPontoMedicao}P</bo:codigo>
         </bm:medidor>
      </bm:listarMedidaCincoMinutosRequest>
   </soapenv:Body>
</soapenv:Envelope>`;
  }

  private async parseXmlToJson(
    xmlData: string,
  ): Promise<CceeMedidaCincoMinutosSoapResponse> {
    const parser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: true,
    });

    try {
      const result = await parser.parseStringPromise(xmlData);
      return result as CceeMedidaCincoMinutosSoapResponse;
    } catch (error) {
      throw new Error(`Erro ao fazer parse do XML: ${error.message}`);
    }
  }

  private extractMedidasCincoMinutos(
    jsonData: CceeMedidaCincoMinutosSoapResponse,
  ): CceeMedidaCincoMinutos[] {
    try {
      const response =
        jsonData['soapenv:Envelope']['soapenv:Body'][
          'bmv2:listarMedidaCincoMinutosResponse'
        ];
      const medidasData = response['bmv2:medidas']['bov2:medida'];

      if (!medidasData) {
        return [];
      }

      const medidasArray = Array.isArray(medidasData)
        ? medidasData
        : [medidasData];
      return medidasArray;
    } catch (error) {
      console.error('Erro ao extrair medidas de cinco minutos:', error);
      return [];
    }
  }

  private convertCceeToMedidaCincoMinutos(
    cceeMedida: CceeMedidaCincoMinutos,
  ): MedidaCincoMinutos {
    const codigoMedidor = cceeMedida['bov2:medidor']?.['bov2:codigo'] || '';
    const codigoPontoMedicao = codigoMedidor.endsWith('P')
      ? codigoMedidor.slice(0, -1)
      : codigoMedidor;

    const data = cceeMedida['bov2:data'] || '';

    const energiaAtiva =
      cceeMedida['bov2:energiaAtiva']?.['bov2:consumo']?.['bov2:valor'] || '0';
    const valor = parseFloat(energiaAtiva);

    const unidade =
      cceeMedida['bov2:energiaAtiva']?.['bov2:consumo']?.[
        'bov2:unidadeMedida'
      ] || '';

    return MedidaCincoMinutos.create(
      codigoPontoMedicao,
      new Date(data),
      valor,
      unidade,
    );
  }

  async fetchMedidasCincoMinutos(
    params: CceeMedidaCincoMinutosParams,
  ): Promise<MedidaCincoMinutos[]> {
    try {
      const soapEnvelope = this.buildSoapEnvelope(params);
      const xmlResponse = await this.cceeApiService.post<string>(
        '/ws/v2/MedidaCincoMinutosBSv2',
        soapEnvelope,
        {
          headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            SOAPAction: 'listarMedidaCincoMinutos',
          },
        },
      );

      const jsonData = await this.parseXmlToJson(xmlResponse);
      const cceeMedidas = this.extractMedidasCincoMinutos(jsonData);

      return cceeMedidas.map((cceeMedida) =>
        this.convertCceeToMedidaCincoMinutos(cceeMedida),
      );
    } catch (error) {
      throw error;
    }
  }
}
