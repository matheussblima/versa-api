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
    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mh="http://xmlns.energia.org.br/MH/v2" xmlns:oas="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:bm="http://xmlns.energia.org.br/BM/v2" xmlns:bo="http://xmlns.energia.org.br/BO/v2">
   <soapenv:Header>
      <mh:messageHeader>
         <mh:codigoPerfilAgente>${codigoPerfilAgente}</mh:codigoPerfilAgente>
      </mh:messageHeader>
      <oas:Security>
         <oas:UsernameToken>
            <oas:Username>19856455000131</oas:Username>
            <oas:Password>Gestao@2</oas:Password>
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

  private async parseXmlToJson(xmlData: string): Promise<any> {
    const parser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: true,
    });
    return await parser.parseStringPromise(xmlData);
  }

  private extractPontosMedicao(jsonData: any): any[] {
    try {
      const envelope = jsonData['soapenv:Envelope'];
      const body = envelope['soapenv:Body'];
      const response = body['bmv2:listarPontoMedicaoResponse'];
      const pontosMedicao = response['bmv2:pontosMedicao'];

      if (pontosMedicao && pontosMedicao['bov2:pontoMedicao']) {
        const pontos = Array.isArray(pontosMedicao['bov2:pontoMedicao'])
          ? pontosMedicao['bov2:pontoMedicao']
          : [pontosMedicao['bov2:pontoMedicao']];
        return pontos;
      }

      return [];
    } catch (error) {
      console.error('Erro ao extrair pontos de medição:', error);
      return [];
    }
  }

  async fetchAndSavePontosMedicaoBySubUnidadeId(
    subUnidadeId: string,
  ): Promise<void> {
    try {
      const subUnidade = await this.subUnidadeRepository.findById(subUnidadeId);
      if (!subUnidade) {
        throw new Error(`Subunidade com ID ${subUnidadeId} não encontrada`);
      }

      const unidade = await this.unidadeRepository.findById(
        subUnidade.unidadeId,
      );
      if (!unidade) {
        throw new Error(
          `Unidade com ID ${subUnidade.unidadeId} não encontrada`,
        );
      }

      const codigoPerfilAgente = unidade.codigoCCEE;
      const soapEnvelope = this.buildSoapEnvelope(codigoPerfilAgente);

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

      const pontosMedicao = this.extractPontosMedicao(jsonData);

      for (const pontoData of pontosMedicao) {
        const pontoMedicao = PontoDeMedicao.create(
          pontoData['bov2:nome'] || 'Ponto de Medição',
          subUnidadeId,
          pontoData['bov2:codigo'] || '',
        );

        await this.pontoMedicaoRepository.create(pontoMedicao);
      }
    } catch (error) {
      throw error;
    }
  }
}
