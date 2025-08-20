import { Injectable } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import {
  ExternalData,
  IExternalDataService,
} from '../../domain/services/external-data.service';

@Injectable()
export class ExternalDataHttpService implements IExternalDataService {
  constructor(private readonly externalApiService: ExternalApiService) {}

  async fetchData(): Promise<ExternalData[]> {
    try {
      const response = await this.externalApiService.get<ExternalData[]>(
        'https://api.exemplo.com/data',
      );
      return response.map((item) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }));
    } catch (error) {
      console.error('Erro ao buscar dados externos:', error);
      throw new Error('Falha ao buscar dados externos');
    }
  }

  async sendData(data: ExternalData): Promise<void> {
    try {
      await this.externalApiService.post('https://api.exemplo.com/data', data);
    } catch (error) {
      console.error('Erro ao enviar dados externos:', error);
      throw new Error('Falha ao enviar dados externos');
    }
  }
}
