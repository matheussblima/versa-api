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

    const savedMedidas: MedidaQuinzeMinutos[] = [];

    for (const [codigoPonto, medidasDoPonto] of medidasPorPonto) {
      const pontoDeMedicao = await this.prisma.pontoDeMedicao.findUnique({
        where: { codigo: codigoPonto },
      });

      if (!pontoDeMedicao) {
        throw new Error(
          `Ponto de medição com código ${codigoPonto} não encontrado`,
        );
      }

      const resultado = await this.prisma.$transaction(async (tx) => {
        const saved: MedidaQuinzeMinutos[] = [];

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

          saved.push(
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

        return saved;
      });

      savedMedidas.push(...resultado);
    }

    return savedMedidas;
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
