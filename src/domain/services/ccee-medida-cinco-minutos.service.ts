import { MedidaCincoMinutos } from '../entities/medida-cinco-minutos.entity';
import { CceeMedidaCincoMinutosParams } from '../types/ccee-medida-cinco-minutos.types';

export interface ICceeMedidaCincoMinutosService {
  fetchMedidasCincoMinutos(
    params: CceeMedidaCincoMinutosParams,
  ): Promise<MedidaCincoMinutos[]>;
}

export const CCEE_MEDIDA_CINCO_MINUTOS_SERVICE =
  'CCEE_MEDIDA_CINCO_MINUTOS_SERVICE';
