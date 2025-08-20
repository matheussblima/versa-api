export class Unidade {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly codigoCCEE: string,
    public readonly cnpj: string,
    public readonly grupoEconomico: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(
    nome: string,
    codigoCCEE: string,
    cnpj: string,
    grupoEconomico: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): Unidade {
    return new Unidade(
      id || crypto.randomUUID(),
      nome,
      codigoCCEE,
      cnpj,
      grupoEconomico,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }
}
