import { Regiao } from '../entities/regiao.entity';

export interface RegiaoRepositoryInterface {
  create(regiao: Regiao): Promise<Regiao>;
  findAll(): Promise<Regiao[]>;
  findById(id: string): Promise<Regiao | null>;
  update(id: string, regiao: Partial<Regiao>): Promise<Regiao>;
  delete(id: string): Promise<void>;
}

export const REGIAO_REPOSITORY = 'REGIAO_REPOSITORY';
