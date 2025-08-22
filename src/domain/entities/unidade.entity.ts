export class Unidade {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly codigoCCEE: string,
    public readonly grupoEconomico: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(
    nome: string,
    codigoCCEE: string,
    grupoEconomico: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): Unidade {
    return new Unidade(
      id || crypto.randomUUID(),
      nome,
      codigoCCEE,
      grupoEconomico,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }
}
