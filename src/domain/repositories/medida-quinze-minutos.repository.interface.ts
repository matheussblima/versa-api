import { MedidaQuinzeMinutos } from '../entities/medida-quinze-minutos.entity';

export const MEDIDA_QUINZE_MINUTOS_REPOSITORY =
  'MEDIDA_QUINZE_MINUTOS_REPOSITORY';

export interface IMedidaQuinzeMinutosRepository {
  save(medida: MedidaQuinzeMinutos): Promise<MedidaQuinzeMinutos>;
  saveMany(medidas: MedidaQuinzeMinutos[]): Promise<MedidaQuinzeMinutos[]>;
  findAll(): Promise<MedidaQuinzeMinutos[]>;
  findById(id: string): Promise<MedidaQuinzeMinutos | null>;
  findByPontoMedicaoAndDateRange(
    codigoPontoMedicao: string,
    dataInicio: Date,
    dataFim: Date,
  ): Promise<MedidaQuinzeMinutos[]>;
  existsByPontoMedicaoAndDataHora(
    codigoPontoMedicao: string,
    dataHora: Date,
  ): Promise<boolean>;
  update(
    id: string,
    medida: Partial<MedidaQuinzeMinutos>,
  ): Promise<MedidaQuinzeMinutos>;
  delete(id: string): Promise<void>;
  deleteByPontoMedicaoAndDateRange(
    codigoPontoMedicao: string,
    dataInicio: Date,
    dataFim: Date,
  ): Promise<void>;
}
