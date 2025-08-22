import { Estado } from '../entities/estado.entity';

export interface EstadoRepositoryInterface {
  create(estado: Estado): Promise<Estado>;
  findAll(): Promise<Estado[]>;
  findById(id: string): Promise<Estado | null>;
  findByRegiaoId(regiaoId: string): Promise<Estado[]>;
  update(id: string, estado: Partial<Estado>): Promise<Estado>;
  delete(id: string): Promise<void>;
}

export const ESTADO_REPOSITORY = 'ESTADO_REPOSITORY';
