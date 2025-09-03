import { Unidade } from '../entities/unidade.entity';

export interface IUnidadeRepository {
  create(unidade: Unidade): Promise<Unidade>;
  findById(id: string): Promise<Unidade | null>;
  findAll(): Promise<Unidade[]>;
  findByCodigoCCEE(codigoCCEE: string): Promise<Unidade | null>;
  update(id: string, unidade: Partial<Unidade>): Promise<Unidade>;
  delete(id: string): Promise<void>;
}

export const UNIDADE_REPOSITORY = 'UNIDADE_REPOSITORY';
