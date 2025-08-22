import { PontoDeMedicao } from '../entities/ponto-de-medicao.entity';

export interface IPontoDeMedicaoRepository {
  create(pontoDeMedicao: PontoDeMedicao): Promise<PontoDeMedicao>;
  findById(id: string): Promise<PontoDeMedicao | null>;
  findAll(): Promise<PontoDeMedicao[]>;
  update(
    id: string,
    pontoDeMedicao: Partial<PontoDeMedicao>,
  ): Promise<PontoDeMedicao>;
  delete(id: string): Promise<void>;
}

export const PONTO_DE_MEDICAO_REPOSITORY = 'PONTO_DE_MEDICAO_REPOSITORY';
