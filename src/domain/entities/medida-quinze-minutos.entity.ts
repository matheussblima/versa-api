export class MedidaQuinzeMinutos {
  constructor(
    public readonly id: string,
    public readonly codigoPontoMedicao: string,
    public readonly dataHora: Date,
    public readonly valor: number,
    public readonly unidade?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(
    codigoPontoMedicao: string,
    dataHora: Date,
    valor: number,
    unidade?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): MedidaQuinzeMinutos {
    return new MedidaQuinzeMinutos(
      id || crypto.randomUUID(),
      codigoPontoMedicao,
      dataHora,
      valor,
      unidade,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }
}
