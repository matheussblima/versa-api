export class PontoDeMedicao {
  constructor(
    public readonly id: string,
    public readonly codigo: string,
    public readonly subUnidadeId: string,
    public readonly descricao?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(
    codigo: string,
    subUnidadeId: string,
    descricao?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): PontoDeMedicao {
    return new PontoDeMedicao(
      id || crypto.randomUUID(),
      codigo,
      subUnidadeId,
      descricao,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }
}
