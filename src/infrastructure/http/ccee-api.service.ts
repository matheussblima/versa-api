import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as fs from 'fs';
import * as https from 'https';
import * as forge from 'node-forge';

@Injectable()
export class CceeApiService {
  private readonly httpClient: AxiosInstance;

  constructor() {
    const baseURL =
      process.env.CCEE_BASE_URL || 'https://servicos.ccee.org.br:443';
    const certPath = process.env.CCEE_CERT_PATH || './certs/certificate.pfx';
    const certPassword = process.env.CCEE_CERT_PASSWORD || '';

    let httpsAgent;

    try {
      if (fs.existsSync(certPath)) {
        const pfxBuffer = fs.readFileSync(certPath);

        const p12Der = forge.util.decode64(pfxBuffer.toString('base64'));
        const p12Asn1 = forge.asn1.fromDer(p12Der);
        const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, certPassword);

        const certBags = p12.getBags({
          bagType: forge.pki.oids.certBag,
        })[forge.pki.oids.certBag];
        const keyBags = p12.getBags({
          bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
        })[forge.pki.oids.pkcs8ShroudedKeyBag];

        if (certBags && certBags.length > 0 && keyBags && keyBags.length > 0) {
          const cert = certBags[0].cert;
          const privateKey = keyBags[0].key;

          const certPem = forge.pki.certificateToPem(cert);
          const keyPem = forge.pki.privateKeyToPem(privateKey);

          httpsAgent = new https.Agent({
            cert: certPem,
            key: keyPem,
            rejectUnauthorized: false,
            secureProtocol: 'TLSv1_2_method',
          });
        } else {
          throw new Error(
            'Não foi possível extrair certificado ou chave privada do arquivo PFX',
          );
        }
      } else {
        throw new Error(`Certificado não encontrado em: ${certPath}`);
      }
    } catch (error) {
      throw error;
    }

    this.httpClient = axios.create({
      baseURL,
      timeout: 30000,
      httpsAgent,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
      },
      responseType: 'text',
    });

    this.httpClient.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.httpClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error(
          'Erro na resposta CCEE:',
          error.response?.status,
          error.response?.data,
        );
        return Promise.reject(error);
      },
    );
  }

  async get<T>(endpoint: string, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.get(
      endpoint,
      config,
    );
    return response.data;
  }

  async post<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.post(
      endpoint,
      data,
      config,
    );
    return response.data;
  }

  async put<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.put(
      endpoint,
      data,
      config,
    );
    return response.data;
  }

  async delete<T>(endpoint: string, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.delete(
      endpoint,
      config,
    );
    return response.data;
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.httpClient.get('/');
      return true;
    } catch (error) {
      console.error('Erro ao testar conexão com CCEE:', error);
      return false;
    }
  }
}
