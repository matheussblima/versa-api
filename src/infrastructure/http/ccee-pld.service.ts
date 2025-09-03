import { Injectable, Logger, Inject } from '@nestjs/common';
import { CceeApiService } from './ccee-api.service';
import { PLD } from '../../domain/entities/pld.entity';
import * as xml2js from 'xml2js';
import { ICceePldService } from '../../domain/services/ccee-pld.service';
import {
  CceePldParams,
  CceePldSoapResponse,
} from '../../domain/types/ccee-pld.types';
import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../domain/repositories/unidade.repository.interface';

@Injectable()
export class CceePldService implements ICceePldService {
  private readonly logger = new Logger(CceePldService.name);

  constructor(
    private readonly cceeApiService: CceeApiService,
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
  ) {}

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

  private async convertToPldEntities(
    soapResponse: CceePldSoapResponse,
    codigoCCEE: string,
  ): Promise<PLD[]> {
    const plds: PLD[] = [];

    try {
      const unidades =
        await this.unidadeRepository.findByCodigoCCEE(codigoCCEE);
      if (!unidades) {
        throw new Error('Nenhuma unidade encontrada no banco de dados');
      }

      this.logger.debug(
        'Iniciando conversão da resposta SOAP para entidades PLD',
      );

      const responseData =
        soapResponse['soapenv:Envelope']['soapenv:Body'][
          'bm:listarPLDResponse'
        ];

      this.logger.debug(
        `ResponseData: ${JSON.stringify(responseData, null, 2)}`,
      );

      if (!responseData) {
        this.logger.warn('ResponseData não encontrado');
        return plds;
      }

      if (!responseData['bm:plds']) {
        this.logger.warn('bm:plds não encontrado');
        return plds;
      }

      if (!responseData['bm:plds']['bm:pld']) {
        this.logger.warn('bm:pld não encontrado');
        return plds;
      }

      const pldArray = Array.isArray(responseData['bm:plds']['bm:pld'])
        ? responseData['bm:plds']['bm:pld']
        : [responseData['bm:plds']['bm:pld']];

      this.logger.debug(
        `Encontrados ${pldArray.length} registros PLD na resposta`,
      );

      for (const pld of pldArray) {
        if (!pld['bo:vigencia'] || !pld['bo:valores']) {
          this.logger.warn('PLD sem vigencia ou valores válidos');
          continue;
        }

        const dataHora = new Date(pld['bo:vigencia']['bo:inicio']);
        this.logger.debug(
          `Processando PLD para data: ${dataHora.toISOString()}`,
        );

        const valoresArray = Array.isArray(pld['bo:valores']['bo:valor'])
          ? pld['bo:valores']['bo:valor']
          : [pld['bo:valores']['bo:valor']];

        for (const valor of valoresArray) {
          if (
            !valor['bo:submercado'] ||
            !valor['bo:valor'] ||
            !valor['bo:submercado']['bo:codigo'] ||
            !valor['bo:submercado']['bo:nome'] ||
            !valor['bo:valor']['bo:valor']
          ) {
            this.logger.warn('Valor PLD sem dados válidos');
            continue;
          }

          const pldEntity = PLD.create(
            dataHora,
            valor['bo:submercado']['bo:nome'],
            valor['bo:submercado']['bo:codigo'],
            parseFloat(valor['bo:valor']['bo:valor']),
            unidades.id,
            valor['bo:valor']['bo:codigo'] || 'BRL',
            valor['bo:tipo'] || 'HORARIO',
          );

          plds.push(pldEntity);
          this.logger.debug(
            `PLD criado: ${pldEntity.submercado} - ${pldEntity.valor}`,
          );
        }
      }

      this.logger.debug(`Total de ${plds.length} entidades PLD criadas`);
    } catch (error) {
      this.logger.error(`Erro ao converter resposta SOAP: ${error.message}`);
      throw new Error(
        `Erro ao converter resposta SOAP para entidades PLD: ${error.message}`,
      );
    }

    return plds;
  }

  async fetchPLD(params: CceePldParams): Promise<PLD[]> {
    try {
      this.logger.log(
        `Iniciando busca de PLD para ${params.dataInicio} até ${params.dataFim}`,
      );

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

      this.logger.debug('Resposta SOAP recebida, fazendo parse...');
      const soapResponse = await this.parseXmlToJson(response);

      this.logger.debug('Parse XML concluído, convertendo para entidades...');
      const plds = await this.convertToPldEntities(
        soapResponse,
        params.codigoPerfilAgente,
      );

      this.logger.log(
        `Busca concluída. Total de ${plds.length} PLDs encontrados`,
      );
      return plds;
    } catch (error) {
      this.logger.error(`Erro ao buscar PLD da CCEE: ${error.message}`);
      throw new Error(`Erro ao buscar PLD da CCEE: ${error.message}`);
    }
  }
}
