import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as fs from 'fs';
import * as https from 'https';

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
        httpsAgent = new https.Agent({
          pfx: fs.readFileSync(certPath),
          passphrase: certPassword,
        });
      } else {
        console.warn(`Certificado não encontrado em: ${certPath}`);
      }
    } catch (error) {
      console.error('Erro ao carregar certificado:', error);
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
        console.log(
          `Requisição CCEE: ${config.method?.toUpperCase()} ${config.url}`,
        );
        return config;
      },
      (error) => {
        console.error('Erro na requisição CCEE:', error);
        return Promise.reject(error);
      },
    );

    this.httpClient.interceptors.response.use(
      (response) => {
        console.log(`Resposta CCEE: ${response.status} ${response.config.url}`);
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
