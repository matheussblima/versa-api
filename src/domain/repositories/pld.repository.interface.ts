import { PLD } from '../entities/pld.entity';

export interface IPldRepository {
  save(pld: PLD): Promise<PLD>;
  saveMany(plds: PLD[]): Promise<PLD[]>;
  findById(id: string): Promise<PLD | null>;
  findAll(
    dataInicio?: Date,
    dataFim?: Date,
    codigoSubmercado?: string,
    tipo?: string,
    unidadeId?: string,
    page?: number,
    limit?: number,
  ): Promise<{ plds: PLD[]; total: number }>;
  findByDataHora(dataHora: Date): Promise<PLD[]>;
  findByDataHoraAndSubmercado(
    dataHora: Date,
    codigoSubmercado: string,
    tipo: string,
  ): Promise<PLD | null>;
  existsByDataHoraAndSubmercado(
    dataHora: Date,
    codigoSubmercado: string,
    tipo: string,
  ): Promise<boolean>;
  update(id: string, pld: Partial<PLD>): Promise<PLD>;
  delete(id: string): Promise<void>;
  deleteByDataHora(dataHora: Date): Promise<void>;
}

export const PLD_REPOSITORY = 'PLD_REPOSITORY';
