import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IMedidaQuinzeMinutosRepository } from '../../../domain/repositories/medida-quinze-minutos.repository.interface';
import { MedidaQuinzeMinutos } from '../../../domain/entities/medida-quinze-minutos.entity';

@Injectable()
export class MedidaQuinzeMinutosRepository
  implements IMedidaQuinzeMinutosRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(medida: MedidaQuinzeMinutos): Promise<MedidaQuinzeMinutos> {
    const pontoDeMedicao = await this.prisma.pontoDeMedicao.findUnique({
      where: { codigo: medida.codigoPontoMedicao },
    });

    if (!pontoDeMedicao) {
      throw new Error(
        `Ponto de medição com código ${medida.codigoPontoMedicao} não encontrado`,
      );
    }

    const savedMedida = await this.prisma.medidaQuinzeMinutos.upsert({
      where: {
        codigoPontoMedicao_dataHora: {
          codigoPontoMedicao: medida.codigoPontoMedicao,
          dataHora: medida.dataHora,
        },
      },
      update: {
        valor: medida.valor,
        unidade: medida.unidade,
        updatedAt: new Date(),
      },
      create: {
        id: medida.id,
        codigoPontoMedicao: medida.codigoPontoMedicao,
        dataHora: medida.dataHora,
        valor: medida.valor,
        unidade: medida.unidade,
        pontoDeMedicaoId: pontoDeMedicao.id,
      },
    });

    return MedidaQuinzeMinutos.create(
      savedMedida.codigoPontoMedicao,
      savedMedida.dataHora,
      savedMedida.valor,
      savedMedida.unidade,
      savedMedida.id,
      savedMedida.createdAt,
      savedMedida.updatedAt,
    );
  }

  async saveMany(
    medidas: MedidaQuinzeMinutos[],
  ): Promise<MedidaQuinzeMinutos[]> {
    if (medidas.length === 0) {
      return [];
    }

    const medidasPorPonto = new Map<string, MedidaQuinzeMinutos[]>();
    for (const medida of medidas) {
      if (!medidasPorPonto.has(medida.codigoPontoMedicao)) {
        medidasPorPonto.set(medida.codigoPontoMedicao, []);
      }
      medidasPorPonto.get(medida.codigoPontoMedicao)!.push(medida);
    }

    const codigosPontos = Array.from(medidasPorPonto.keys());
    const pontosDeMedicao = await this.prisma.pontoDeMedicao.findMany({
      where: { codigo: { in: codigosPontos } },
    });

    const pontosMap = new Map(
      pontosDeMedicao.map((ponto) => [ponto.codigo, ponto]),
    );

    for (const codigoPonto of codigosPontos) {
      if (!pontosMap.has(codigoPonto)) {
        throw new Error(
          `Ponto de medição com código ${codigoPonto} não encontrado`,
        );
      }
    }

    try {
      return await this.prisma.$transaction(
        async (tx) => {
          const savedMedidas: MedidaQuinzeMinutos[] = [];

          for (const [codigoPonto, medidasDoPonto] of medidasPorPonto) {
            const pontoDeMedicao = pontosMap.get(codigoPonto)!;

            for (const medida of medidasDoPonto) {
              const savedMedida = await tx.medidaQuinzeMinutos.upsert({
                where: {
                  codigoPontoMedicao_dataHora: {
                    codigoPontoMedicao: medida.codigoPontoMedicao,
                    dataHora: medida.dataHora,
                  },
                },
                update: {
                  valor: medida.valor,
                  unidade: medida.unidade,
                  updatedAt: new Date(),
                },
                create: {
                  id: medida.id,
                  codigoPontoMedicao: medida.codigoPontoMedicao,
                  dataHora: medida.dataHora,
                  valor: medida.valor,
                  unidade: medida.unidade,
                  pontoDeMedicaoId: pontoDeMedicao.id,
                },
              });

              savedMedidas.push(
                MedidaQuinzeMinutos.create(
                  savedMedida.codigoPontoMedicao,
                  savedMedida.dataHora,
                  savedMedida.valor,
                  savedMedida.unidade,
                  savedMedida.id,
                  savedMedida.createdAt,
                  savedMedida.updatedAt,
                ),
              );
            }
          }

          return savedMedidas;
        },
        {
          timeout: 30000, // 30 segundos de timeout
        },
      );
    } catch (error) {
      console.error('Erro na transação do Prisma:', error);
      throw error;
    }
  }

  async findByPontoMedicaoAndDateRange(
    codigoPontoMedicao: string,
    dataInicio: Date,
    dataFim: Date,
  ): Promise<MedidaQuinzeMinutos[]> {
    const medidas = await this.prisma.medidaQuinzeMinutos.findMany({
      where: {
        codigoPontoMedicao,
        dataHora: {
          gte: dataInicio,
          lte: dataFim,
        },
      },
      orderBy: {
        dataHora: 'asc',
      },
    });

    return medidas.map((medida) =>
      MedidaQuinzeMinutos.create(
        medida.codigoPontoMedicao,
        medida.dataHora,
        medida.valor,
        medida.unidade,
        medida.id,
        medida.createdAt,
        medida.updatedAt,
      ),
    );
  }

  async existsByPontoMedicaoAndDataHora(
    codigoPontoMedicao: string,
    dataHora: Date,
  ): Promise<boolean> {
    const count = await this.prisma.medidaQuinzeMinutos.count({
      where: {
        codigoPontoMedicao,
        dataHora,
      },
    });

    return count > 0;
  }

  async findAll(
    codigoPontoMedicao?: string,
    unidadeId?: string,
    page?: number,
    limit?: number,
  ): Promise<{ data: MedidaQuinzeMinutos[]; total: number }> {
    const where: any = {};

    if (codigoPontoMedicao) {
      where.codigoPontoMedicao = codigoPontoMedicao;
    }

    if (unidadeId) {
      where.pontoDeMedicao = {
        subUnidade: {
          unidadeId: unidadeId,
        },
      };
    }

    const pageNumber = page || 1;
    const pageSize = limit || 20;
    const skip = (pageNumber - 1) * pageSize;

    const [medidas, total] = await Promise.all([
      this.prisma.medidaQuinzeMinutos.findMany({
        where,
        orderBy: {
          dataHora: 'desc',
        },
        skip,
        take: pageSize,
      }),
      this.prisma.medidaQuinzeMinutos.count({
        where,
      }),
    ]);

    const data = medidas.map((medida) =>
      MedidaQuinzeMinutos.create(
        medida.codigoPontoMedicao,
        medida.dataHora,
        medida.valor,
        medida.unidade,
        medida.id,
        medida.createdAt,
        medida.updatedAt,
      ),
    );

    return { data, total };
  }

  async findById(id: string): Promise<MedidaQuinzeMinutos | null> {
    const medida = await this.prisma.medidaQuinzeMinutos.findUnique({
      where: { id },
    });

    if (!medida) {
      return null;
    }

    return MedidaQuinzeMinutos.create(
      medida.codigoPontoMedicao,
      medida.dataHora,
      medida.valor,
      medida.unidade,
      medida.id,
      medida.createdAt,
      medida.updatedAt,
    );
  }

  async update(
    id: string,
    medidaData: Partial<MedidaQuinzeMinutos>,
  ): Promise<MedidaQuinzeMinutos> {
    const updateData: any = {};

    if (medidaData.codigoPontoMedicao !== undefined) {
      updateData.codigoPontoMedicao = medidaData.codigoPontoMedicao;
    }

    if (medidaData.dataHora !== undefined) {
      updateData.dataHora = medidaData.dataHora;
    }

    if (medidaData.valor !== undefined) {
      updateData.valor = medidaData.valor;
    }

    if (medidaData.unidade !== undefined) {
      updateData.unidade = medidaData.unidade;
    }

    updateData.updatedAt = new Date();

    const updatedMedida = await this.prisma.medidaQuinzeMinutos.update({
      where: { id },
      data: updateData,
    });

    return MedidaQuinzeMinutos.create(
      updatedMedida.codigoPontoMedicao,
      updatedMedida.dataHora,
      updatedMedida.valor,
      updatedMedida.unidade,
      updatedMedida.id,
      updatedMedida.createdAt,
      updatedMedida.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.medidaQuinzeMinutos.delete({
      where: { id },
    });
  }

  async deleteByPontoMedicaoAndDateRange(
    codigoPontoMedicao: string,
    dataInicio: Date,
    dataFim: Date,
  ): Promise<void> {
    await this.prisma.medidaQuinzeMinutos.deleteMany({
      where: {
        codigoPontoMedicao,
        dataHora: {
          gte: dataInicio,
          lte: dataFim,
        },
      },
    });
  }
}
