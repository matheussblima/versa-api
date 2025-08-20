import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

@Injectable()
export class ExternalApiService {
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para logs
    this.httpClient.interceptors.request.use(
      (config) => {
        console.log(
          `Requisição HTTP: ${config.method?.toUpperCase()} ${config.url}`,
        );
        return config;
      },
      (error) => {
        console.error('Erro na requisição HTTP:', error);
        return Promise.reject(error);
      },
    );

    this.httpClient.interceptors.response.use(
      (response) => {
        console.log(`Resposta HTTP: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error(
          'Erro na resposta HTTP:',
          error.response?.status,
          error.response?.data,
        );
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.post(
      url,
      data,
      config,
    );
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.put(
      url,
      data,
      config,
    );
    return response.data;
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.delete(
      url,
      config,
    );
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.patch(
      url,
      data,
      config,
    );
    return response.data;
  }
}
