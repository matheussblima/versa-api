export class PontoDeMedicao {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly subUnidadeId: string,
    public readonly descricao?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(
    nome: string,
    subUnidadeId: string,
    descricao?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): PontoDeMedicao {
    return new PontoDeMedicao(
      id || crypto.randomUUID(),
      nome,
      subUnidadeId,
      descricao,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }
}
