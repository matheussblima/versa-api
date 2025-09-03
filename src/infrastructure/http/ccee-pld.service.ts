import { Injectable } from '@nestjs/common';
import { CceeApiService } from './ccee-api.service';
import { PLD } from '../../domain/entities/pld.entity';
import * as xml2js from 'xml2js';
import { ICceePldService } from '../../domain/services/ccee-pld.service';
import {
  CceePldParams,
  CceePldSoapResponse,
} from '../../domain/types/ccee-pld.types';

@Injectable()
export class CceePldService implements ICceePldService {
  constructor(private readonly cceeApiService: CceeApiService) {}

  private buildSoapEnvelope(params: CceePldParams): string {
    const username = process.env.CCEE_USERNAME || '';
    const password = process.env.CCEE_PASSWORD || '';
    const numero = params.numero || 1;
    const quantidadeItens = params.quantidadeItens || 50;

    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mh="http://xmlns.energia.org.br/MH/v1" xmlns:oas="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:bm="http://xmlns.energia.org.br/BM/v1" xmlns:bo="http://xmlns.energia.org.br/BO/v1">
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
      <bm:listarPLDRequest>
         <bm:plds>
            <bm:pld>
               <bo:vigencia>
                  <bo:inicio>${params.dataInicio}T00:00:00</bo:inicio>
                  <bo:fim>${params.dataFim}T00:00:00</bo:fim>
               </bo:vigencia>
               <bo:valores>
                  <bo:valor>
                     <bo:tipo>${params.tipo || 'HORARIO'}</bo:tipo>
                  </bo:valor>
               </bo:valores>
            </bm:pld>
         </bm:plds>
      </bm:listarPLDRequest>
   </soapenv:Body>
</soapenv:Envelope>`;
  }

  private async parseXmlToJson(xmlData: string): Promise<CceePldSoapResponse> {
    const parser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: true,
    });

    try {
      const result = await parser.parseStringPromise(xmlData);
      return result;
    } catch (error) {
      throw new Error(`Erro ao fazer parse do XML: ${error.message}`);
    }
  }

  private convertToPldEntities(soapResponse: CceePldSoapResponse): PLD[] {
    const plds: PLD[] = [];

    try {
      const responseData =
        soapResponse['soapenv:Envelope']['soapenv:Body'][
          'bm:listarPLDResponse'
        ];

      if (!responseData || !responseData.plds || !responseData.plds.pld) {
        return plds;
      }

      const pldArray = Array.isArray(responseData.plds.pld)
        ? responseData.plds.pld
        : [responseData.plds.pld];

      for (const pld of pldArray) {
        if (!pld.vigencia || !pld.valores || !Array.isArray(pld.valores)) {
          continue;
        }

        const dataHora = new Date(pld.vigencia.inicio);

        for (const valor of pld.valores) {
          if (
            !valor.submercado ||
            !valor.valor ||
            !valor.submercado.codigo ||
            !valor.submercado.nome ||
            !valor.valor.valor
          ) {
            continue;
          }

          const pldEntity = PLD.create(
            dataHora,
            valor.submercado.nome,
            valor.submercado.codigo,
            parseFloat(valor.valor.valor),
            valor.valor.codigo || 'BRL',
          );

          plds.push(pldEntity);
        }
      }
    } catch (error) {
      throw new Error(
        `Erro ao converter resposta SOAP para entidades PLD: ${error.message}`,
      );
    }

    return plds;
  }

  async fetchPLD(params: CceePldParams): Promise<PLD[]> {
    try {
      const soapEnvelope = this.buildSoapEnvelope(params);

      const response = await this.cceeApiService.post<string>(
        '/ws/prec/PLDBSv1',
        soapEnvelope,
        {
          headers: {
            SOAPAction: 'listarPLD',
          },
        },
      );

      const soapResponse = await this.parseXmlToJson(response);
      const plds = this.convertToPldEntities(soapResponse);

      return plds;
    } catch (error) {
      throw new Error(`Erro ao buscar PLD da CCEE: ${error.message}`);
    }
  }
}
