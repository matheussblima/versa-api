import { MedidaQuinzeMinutos } from '../entities/medida-quinze-minutos.entity';
import { CceeMedidaCincoMinutosParams } from '../types/ccee-medida-cinco-minutos.types';

export interface ICceeMedidaQuinzeMinutosService {
  fetchMedidasQuinzeMinutos(
    params: CceeMedidaCincoMinutosParams,
  ): Promise<MedidaQuinzeMinutos[]>;
}

export const CCEE_MEDIDA_QUINZE_MINUTOS_SERVICE =
  'CCEE_MEDIDA_QUINZE_MINUTOS_SERVICE';
