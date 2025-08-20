import { SubUnidade } from '../entities/subunidade.entity';

export interface SubUnidadeRepositoryInterface {
  create(subUnidade: SubUnidade): Promise<SubUnidade>;
  findById(id: string): Promise<SubUnidade | null>;
  findAll(): Promise<SubUnidade[]>;
  findByUnidadeId(unidadeId: string): Promise<SubUnidade[]>;
  update(id: string, subUnidade: Partial<SubUnidade>): Promise<SubUnidade>;
  delete(id: string): Promise<void>;
}

export const SUBUNIDADE_REPOSITORY = 'SUBUNIDADE_REPOSITORY';
