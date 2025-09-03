import { PLD } from '../entities/pld.entity';
import { CceePldParams } from '../types/ccee-pld.types';

export interface ICceePldService {
  fetchPLD(params: CceePldParams): Promise<PLD[]>;
}

export const CCEE_PLD_SERVICE = 'CCEE_PLD_SERVICE';
