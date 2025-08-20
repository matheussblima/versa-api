export interface ExternalData {
  id: string;
  name: string;
  value: number;
  timestamp: Date;
}

export interface IExternalDataService {
  fetchData(): Promise<ExternalData[]>;
  sendData(data: ExternalData): Promise<void>;
}

export const EXTERNAL_DATA_SERVICE = 'EXTERNAL_DATA_SERVICE';
