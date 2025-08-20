import { Injectable, Inject } from '@nestjs/common';
import {
  EXTERNAL_DATA_SERVICE,
  IExternalDataService,
} from '../../domain/services/external-data.service';

@Injectable()
export class SyncExternalDataUseCase {
  constructor(
    @Inject(EXTERNAL_DATA_SERVICE)
    private readonly externalDataService: IExternalDataService,
  ) {}

  async execute(): Promise<void> {
    try {
      console.log('Iniciando sincronização de dados externos...');

      // Buscar dados externos
      const externalData = await this.externalDataService.fetchData();
      console.log(`Dados externos recebidos: ${externalData.length} registros`);

      // Processar dados (aqui você pode adicionar lógica de negócio)
      for (const data of externalData) {
        console.log(`Processando dados: ${data.name} - ${data.value}`);

        // Exemplo: enviar dados processados de volta
        await this.externalDataService.sendData({
          ...data,
          value: data.value * 2, // Exemplo de processamento
        });
      }

      console.log('Sincronização concluída com sucesso!');
    } catch (error) {
      console.error('Erro durante a sincronização:', error);
      throw error;
    }
  }
}
