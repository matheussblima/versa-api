import { Regiao } from './regiao.entity';

export class Estado {
  constructor(
    public readonly id: string,
    public readonly sigla: string,
    public readonly nome: string,
    public readonly regiaoId: string,
    public readonly regiao?: Regiao,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(
    sigla: string,
    nome: string,
    regiaoId: string,
    regiao?: Regiao,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): Estado {
    return new Estado(
      id || crypto.randomUUID(),
      sigla,
      nome,
      regiaoId,
      regiao,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }
}
