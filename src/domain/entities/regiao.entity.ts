export class Regiao {
  constructor(
    public readonly id: string,
    public readonly sigla: string,
    public readonly nome: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(
    sigla: string,
    nome: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): Regiao {
    return new Regiao(
      id || crypto.randomUUID(),
      sigla,
      nome,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }
}
