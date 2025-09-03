import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PLD } from '../../../domain/entities/pld.entity';
import { IPldRepository } from '../../../domain/repositories/pld.repository.interface';

@Injectable()
export class PldRepository implements IPldRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(pld: PLD): Promise<PLD> {
    const savedPld = await this.prisma.pLD.create({
      data: {
        id: pld.id,
        dataHora: pld.dataHora,
        submercado: pld.submercado,
        codigoSubmercado: pld.codigoSubmercado,
        valor: pld.valor,
        moeda: pld.moeda,
        tipo: pld.tipo,
        unidadeId: pld.unidadeId,
        createdAt: pld.createdAt,
        updatedAt: pld.updatedAt,
      },
    });

    return new PLD(
      savedPld.id,
      savedPld.dataHora,
      savedPld.submercado,
      savedPld.codigoSubmercado,
      savedPld.valor,
      savedPld.moeda,
      savedPld.tipo,
      savedPld.unidadeId,
      savedPld.createdAt,
      savedPld.updatedAt,
    );
  }

  async saveMany(plds: PLD[]): Promise<PLD[]> {
    const data = plds.map((pld) => ({
      id: pld.id,
      dataHora: pld.dataHora,
      submercado: pld.submercado,
      codigoSubmercado: pld.codigoSubmercado,
      valor: pld.valor,
      moeda: pld.moeda,
      tipo: pld.tipo,
      unidadeId: pld.unidadeId,
      createdAt: pld.createdAt,
      updatedAt: pld.updatedAt,
    }));

    await this.prisma.pLD.createMany({
      data,
      skipDuplicates: true,
    });

    return plds;
  }

  async findByDataHora(dataHora: Date): Promise<PLD[]> {
    const plds = await this.prisma.pLD.findMany({
      where: {
        dataHora: {
          gte: new Date(
            dataHora.getFullYear(),
            dataHora.getMonth(),
            dataHora.getDate(),
          ),
          lt: new Date(
            dataHora.getFullYear(),
            dataHora.getMonth(),
            dataHora.getDate() + 1,
          ),
        },
      },
    });

    return plds.map(
      (pld) =>
        new PLD(
          pld.id,
          pld.dataHora,
          pld.submercado,
          pld.codigoSubmercado,
          pld.valor,
          pld.moeda,
          pld.tipo,
          pld.unidadeId,
          pld.createdAt,
          pld.updatedAt,
        ),
    );
  }

  async findByDataHoraAndSubmercado(
    dataHora: Date,
    codigoSubmercado: string,
    tipo: string,
  ): Promise<PLD | null> {
    const pld = await this.prisma.pLD.findFirst({
      where: {
        dataHora,
        codigoSubmercado,
        tipo,
      },
    });

    if (!pld) {
      return null;
    }

    return new PLD(
      pld.id,
      pld.dataHora,
      pld.submercado,
      pld.codigoSubmercado,
      pld.valor,
      pld.moeda,
      pld.tipo,
      pld.unidadeId,
      pld.createdAt,
      pld.updatedAt,
    );
  }

  async existsByDataHoraAndSubmercado(
    dataHora: Date,
    codigoSubmercado: string,
    tipo: string,
  ): Promise<boolean> {
    const count = await this.prisma.pLD.count({
      where: {
        dataHora,
        codigoSubmercado,
        tipo,
      },
    });

    return count > 0;
  }

  async findById(id: string): Promise<PLD | null> {
    const pld = await this.prisma.pLD.findUnique({
      where: { id },
    });

    if (!pld) {
      return null;
    }

    return new PLD(
      pld.id,
      pld.dataHora,
      pld.submercado,
      pld.codigoSubmercado,
      pld.valor,
      pld.moeda,
      pld.tipo,
      pld.unidadeId,
      pld.createdAt,
      pld.updatedAt,
    );
  }

  async findAll(
    dataInicio?: Date,
    dataFim?: Date,
    codigoSubmercado?: string,
    tipo?: string,
    unidadeId?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ plds: PLD[]; total: number }> {
    const where: any = {};

    if (dataInicio || dataFim) {
      where.dataHora = {};
      if (dataInicio) {
        where.dataHora.gte = dataInicio;
      }
      if (dataFim) {
        where.dataHora.lte = dataFim;
      }
    }

    if (codigoSubmercado) {
      where.codigoSubmercado = codigoSubmercado;
    }

    if (tipo) {
      where.tipo = tipo;
    }

    if (unidadeId) {
      where.unidadeId = unidadeId;
    }

    const skip = (page - 1) * limit;

    const [plds, total] = await Promise.all([
      this.prisma.pLD.findMany({
        where,
        skip,
        take: limit,
        orderBy: { dataHora: 'desc' },
      }),
      this.prisma.pLD.count({ where }),
    ]);

    return {
      plds: plds.map(
        (pld) =>
          new PLD(
            pld.id,
            pld.dataHora,
            pld.submercado,
            pld.codigoSubmercado,
            pld.valor,
            pld.moeda,
            pld.tipo,
            pld.unidadeId,
            pld.createdAt,
            pld.updatedAt,
          ),
      ),
      total,
    };
  }

  async update(id: string, pldData: Partial<PLD>): Promise<PLD> {
    const updatedPld = await this.prisma.pLD.update({
      where: { id },
      data: {
        ...(pldData.dataHora && { dataHora: pldData.dataHora }),
        ...(pldData.submercado && { submercado: pldData.submercado }),
        ...(pldData.codigoSubmercado && {
          codigoSubmercado: pldData.codigoSubmercado,
        }),
        ...(pldData.valor !== undefined && { valor: pldData.valor }),
        ...(pldData.moeda && { moeda: pldData.moeda }),
        ...(pldData.tipo && { tipo: pldData.tipo }),
        updatedAt: new Date(),
      },
    });

    return new PLD(
      updatedPld.id,
      updatedPld.dataHora,
      updatedPld.submercado,
      updatedPld.codigoSubmercado,
      updatedPld.valor,
      updatedPld.moeda,
      updatedPld.tipo,
      updatedPld.unidadeId,
      updatedPld.createdAt,
      updatedPld.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.pLD.delete({
      where: { id },
    });
  }

  async deleteByDataHora(dataHora: Date): Promise<void> {
    await this.prisma.pLD.deleteMany({
      where: {
        dataHora: {
          gte: new Date(
            dataHora.getFullYear(),
            dataHora.getMonth(),
            dataHora.getDate(),
          ),
          lt: new Date(
            dataHora.getFullYear(),
            dataHora.getMonth(),
            dataHora.getDate() + 1,
          ),
        },
      },
    });
  }
}
