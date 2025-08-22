export class PontoDeMedicao {
  constructor(
    public readonly id: string,
    public readonly codigo: string,
    public readonly descricao?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(
    codigo: string,
    descricao?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): PontoDeMedicao {
    return new PontoDeMedicao(
      id || crypto.randomUUID(),
      codigo,
      descricao,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }
}
