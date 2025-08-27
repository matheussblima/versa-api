import { Injectable, Inject } from '@nestjs/common';
import { CceeApiService } from './ccee-api.service';
import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../domain/repositories/unidade.repository.interface';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../domain/repositories/ponto-de-medicao.repository.interface';
import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../domain/repositories/subunidade.repository.interface';
import { PontoDeMedicao } from '../../domain/entities/ponto-de-medicao.entity';
import * as xml2js from 'xml2js';
import { ICceePontoMedicaoService } from '../../domain/services/ccee-ponto-medicao.service';
import {
  CceePontoMedicao,
  CceeSoapResponse,
} from '../../domain/types/ccee-ponto-medicao.types';

@Injectable()
export class CceePontoMedicaoService implements ICceePontoMedicaoService {
  constructor(
    private readonly cceeApiService: CceeApiService,
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoMedicaoRepository: IPontoDeMedicaoRepository,
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
  ) {}

  private buildSoapEnvelope(codigoPerfilAgente: string): string {
    const username = process.env.CCEE_USERNAME || '';
    const password = process.env.CCEE_PASSWORD || '';

    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mh="http://xmlns.energia.org.br/MH/v2" xmlns:oas="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:bm="http://xmlns.energia.org.br/BM/v2" xmlns:bo="http://xmlns.energia.org.br/BO/v2">
   <soapenv:Header>
      <mh:messageHeader>
         <mh:codigoPerfilAgente>${codigoPerfilAgente}</mh:codigoPerfilAgente>
      </mh:messageHeader>
      <oas:Security>
         <oas:UsernameToken>
            <oas:Username>${username}</oas:Username>
            <oas:Password>${password}</oas:Password>
         </oas:UsernameToken>
      </oas:Security>
      <mh:paginacao>
         <mh:numero>1</mh:numero>
         <mh:quantidadeItens>50</mh:quantidadeItens>
      </mh:paginacao>
   </soapenv:Header>
   <soapenv:Body>
      <bm:listarPontoMedicaoRequest>
         <bm:tiposRelacoes>
            <bo:tipo>
               <bo:nome>AGENTE_CONECTADO</bo:nome>
            </bo:tipo>
            <bo:tipo>
               <bo:nome>AGENTE_CONECTANTE</bo:nome>
            </bo:tipo>
            <bo:tipo>
               <bo:nome>AGENTE_MEDICAO</bo:nome>
            </bo:tipo>
            <bo:tipo>
               <bo:nome>AGENTE_USO_FIO</bo:nome>
            </bo:tipo>
         </bm:tiposRelacoes>
      </bm:listarPontoMedicaoRequest>
   </soapenv:Body>
</soapenv:Envelope>`;
  }

  private async parseXmlToJson(xmlData: string): Promise<CceeSoapResponse> {
    const parser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: true,
    });
    return await parser.parseStringPromise(xmlData);
  }

  private extractPontosMedicao(jsonData: CceeSoapResponse): CceePontoMedicao[] {
    try {
      const envelope = jsonData['soapenv:Envelope'];
      const body = envelope['soapenv:Body'];
      const response = body['bmv2:listarPontoMedicaoResponse'];
      const pontosMedicao = response['bmv2:pontosMedicao'];

      if (pontosMedicao && pontosMedicao['bov2:pontoMedicao']) {
        const pontos = Array.isArray(pontosMedicao['bov2:pontoMedicao'])
          ? pontosMedicao['bov2:pontoMedicao']
          : [pontosMedicao['bov2:pontoMedicao']];
        return pontos as CceePontoMedicao[];
      }

      return [];
    } catch (error) {
      console.error('Erro ao extrair pontos de medição:', error);
      return [];
    }
  }

  private convertCceeToPontoMedicao(
    cceePonto: CceePontoMedicao,
  ): PontoDeMedicao {
    const codigo = cceePonto['bov2:codigo'];

    const codigoPontoMedicao = codigo.endsWith('P')
      ? codigo.slice(0, -1)
      : codigo;

    return PontoDeMedicao.create(codigoPontoMedicao, cceePonto['bov2:nome']);
  }

  async fetchPontosMedicaoByCodeCcee(
    codeCcee: string,
  ): Promise<PontoDeMedicao[]> {
    try {
      const soapEnvelope = this.buildSoapEnvelope(codeCcee);
      const xmlResponse = await this.cceeApiService.post<string>(
        '/ws/v2/PontoMedicaoBSv2',
        soapEnvelope,
        {
          headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            SOAPAction: 'listarPontoMedicao',
          },
        },
      );

      const jsonData = await this.parseXmlToJson(xmlResponse);

      const cceePontosMedicao = this.extractPontosMedicao(jsonData);

      return cceePontosMedicao.map((cceePonto) =>
        this.convertCceeToPontoMedicao(cceePonto),
      );
    } catch (error) {
      throw error;
    }
  }
}
