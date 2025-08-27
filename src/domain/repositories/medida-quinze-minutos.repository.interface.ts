import { MedidaQuinzeMinutos } from '../entities/medida-quinze-minutos.entity';

export const MEDIDA_QUINZE_MINUTOS_REPOSITORY =
  'MEDIDA_QUINZE_MINUTOS_REPOSITORY';

export interface IMedidaQuinzeMinutosRepository {
  save(medida: MedidaQuinzeMinutos): Promise<MedidaQuinzeMinutos>;
  saveMany(medidas: MedidaQuinzeMinutos[]): Promise<MedidaQuinzeMinutos[]>;
  findByPontoMedicaoAndDateRange(
    codigoPontoMedicao: string,
    dataInicio: Date,
    dataFim: Date,
  ): Promise<MedidaQuinzeMinutos[]>;
  existsByPontoMedicaoAndDataHora(
    codigoPontoMedicao: string,
    dataHora: Date,
  ): Promise<boolean>;
  deleteByPontoMedicaoAndDateRange(
    codigoPontoMedicao: string,
    dataInicio: Date,
    dataFim: Date,
  ): Promise<void>;
}
