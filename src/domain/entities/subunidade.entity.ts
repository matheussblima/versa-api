import { Estado } from './estado.entity';
import { Regiao } from './regiao.entity';
import { PontoDeMedicao } from './ponto-de-medicao.entity';

export class SubUnidade {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly unidadeId: string,
    public readonly descricao?: string,
    public readonly estadoId?: string,
    public readonly estado?: Estado,
    public readonly regiaoId?: string,
    public readonly regiao?: Regiao,
    public readonly apeRemoto?: boolean,
    public readonly apeLocal?: boolean,
    public readonly codigoI5?: string,
    public readonly codigoI0?: string,
    public readonly codigoI100?: string,
    public readonly codigoConv?: string,
    public readonly cnpj?: string,
    public readonly pontoDeMedicaoId?: string,
    public readonly pontoDeMedicao?: PontoDeMedicao,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(
    nome: string,
    unidadeId: string,
    descricao?: string,
    estadoId?: string,
    estado?: Estado,
    regiaoId?: string,
    regiao?: Regiao,
    apeRemoto?: boolean,
    apeLocal?: boolean,
    codigoI5?: string,
    codigoI0?: string,
    codigoI100?: string,
    codigoConv?: string,
    cnpj?: string,
    pontoDeMedicaoId?: string,
    pontoDeMedicao?: PontoDeMedicao,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): SubUnidade {
    return new SubUnidade(
      id || crypto.randomUUID(),
      nome,
      unidadeId,
      descricao,
      estadoId,
      estado,
      regiaoId,
      regiao,
      apeRemoto,
      apeLocal,
      codigoI5,
      codigoI0,
      codigoI100,
      codigoConv,
      cnpj,
      pontoDeMedicaoId,
      pontoDeMedicao,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }
}
