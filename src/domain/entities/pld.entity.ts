import { randomUUID } from 'crypto';

export class PLD {
  constructor(
    public readonly id: string,
    public readonly dataHora: Date,
    public readonly submercado: string,
    public readonly codigoSubmercado: string,
    public readonly valor: number,
    public readonly moeda: string,
    public readonly tipo: string,
    public readonly unidadeId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    dataHora: Date,
    submercado: string,
    codigoSubmercado: string,
    valor: number,
    unidadeId: string,
    moeda: string = 'BRL',
    tipo: string = 'HORARIO',
  ): PLD {
    const now = new Date();
    return new PLD(
      randomUUID(),
      dataHora,
      submercado,
      codigoSubmercado,
      valor,
      moeda,
      tipo,
      unidadeId,
      now,
      now,
    );
  }
}
