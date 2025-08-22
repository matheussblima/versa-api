import { Injectable } from '@nestjs/common';
import { Unidade } from '../../../domain/entities/unidade.entity';
import { IUnidadeRepository } from '../../../domain/repositories/unidade.repository.interface';
import { PrismaService } from '../prisma.service';
import { SubUnidade } from '../../../domain/entities/subunidade.entity';

@Injectable()
export class PrismaUnidadeRepository implements IUnidadeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(unidade: Unidade): Promise<Unidade> {
    const created = await this.prisma.unidades.create({
      data: {
        id: unidade.id,
        nome: unidade.nome,
        codigoCCEE: unidade.codigoCCEE,
        grupoEconomico: unidade.grupoEconomico,
        createdAt: unidade.createdAt,
        updatedAt: unidade.updatedAt,
      },
    });

    return Unidade.create(
      created.nome,
      created.codigoCCEE,
      created.grupoEconomico,
      [],
      created.id,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(id: string): Promise<Unidade | null> {
    const found = await this.prisma.unidades.findUnique({
      where: { id },
      include: {
        subUnidades: {
          include: {
            estado: true,
            regiao: true,
            pontoDeMedicao: true,
          },
        },
      },
    });

    if (!found) return null;

    const subUnidades = found.subUnidades.map((subUnidade) =>
      SubUnidade.create(
        subUnidade.nome,
        subUnidade.unidadeId,
        subUnidade.descricao,
        subUnidade.estadoId,
        subUnidade.estado
          ? {
              id: subUnidade.estado.id,
              sigla: subUnidade.estado.sigla,
              nome: subUnidade.estado.nome,
              regiaoId: subUnidade.estado.regiaoId,
              createdAt: subUnidade.estado.createdAt,
              updatedAt: subUnidade.estado.updatedAt,
            }
          : undefined,
        subUnidade.regiaoId,
        subUnidade.regiao
          ? {
              id: subUnidade.regiao.id,
              sigla: subUnidade.regiao.sigla,
              nome: subUnidade.regiao.nome,
              createdAt: subUnidade.regiao.createdAt,
              updatedAt: subUnidade.regiao.updatedAt,
            }
          : undefined,
        subUnidade.apeRemoto,
        subUnidade.apeLocal,
        subUnidade.codigoI5,
        subUnidade.codigoI0,
        subUnidade.codigoI100,
        subUnidade.codigoConv,
        subUnidade.cnpj,
        subUnidade.pontoDeMedicaoId,
        subUnidade.pontoDeMedicao
          ? {
              id: subUnidade.pontoDeMedicao.id,
              codigo: subUnidade.pontoDeMedicao.codigo,
              descricao: subUnidade.pontoDeMedicao.descricao,
              createdAt: subUnidade.pontoDeMedicao.createdAt,
              updatedAt: subUnidade.pontoDeMedicao.updatedAt,
            }
          : undefined,
        subUnidade.id,
        subUnidade.createdAt,
        subUnidade.updatedAt,
      ),
    );

    return Unidade.create(
      found.nome,
      found.codigoCCEE,
      found.grupoEconomico,
      subUnidades,
      found.id,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findAll(): Promise<Unidade[]> {
    const found = await this.prisma.unidades.findMany({
      include: {
        subUnidades: {
          include: {
            estado: true,
            regiao: true,
            pontoDeMedicao: true,
          },
        },
      },
    });

    return found.map((item) => {
      const subUnidades = item.subUnidades.map((subUnidade) =>
        SubUnidade.create(
          subUnidade.nome,
          subUnidade.unidadeId,
          subUnidade.descricao,
          subUnidade.estadoId,
          subUnidade.estado
            ? {
                id: subUnidade.estado.id,
                sigla: subUnidade.estado.sigla,
                nome: subUnidade.estado.nome,
                regiaoId: subUnidade.estado.regiaoId,
                createdAt: subUnidade.estado.createdAt,
                updatedAt: subUnidade.estado.updatedAt,
              }
            : undefined,
          subUnidade.regiaoId,
          subUnidade.regiao
            ? {
                id: subUnidade.regiao.id,
                sigla: subUnidade.regiao.sigla,
                nome: subUnidade.regiao.nome,
                createdAt: subUnidade.regiao.createdAt,
                updatedAt: subUnidade.regiao.updatedAt,
              }
            : undefined,
          subUnidade.apeRemoto,
          subUnidade.apeLocal,
          subUnidade.codigoI5,
          subUnidade.codigoI0,
          subUnidade.codigoI100,
          subUnidade.codigoConv,
          subUnidade.cnpj,
          subUnidade.pontoDeMedicaoId,
          subUnidade.pontoDeMedicao
            ? {
                id: subUnidade.pontoDeMedicao.id,
                codigo: subUnidade.pontoDeMedicao.codigo,
                descricao: subUnidade.pontoDeMedicao.descricao,
                createdAt: subUnidade.pontoDeMedicao.createdAt,
                updatedAt: subUnidade.pontoDeMedicao.updatedAt,
              }
            : undefined,
          subUnidade.id,
          subUnidade.createdAt,
          subUnidade.updatedAt,
        ),
      );

      return Unidade.create(
        item.nome,
        item.codigoCCEE,
        item.grupoEconomico,
        subUnidades,
        item.id,
        item.createdAt,
        item.updatedAt,
      );
    });
  }

  async update(id: string, unidade: Partial<Unidade>): Promise<Unidade> {
    const updated = await this.prisma.unidades.update({
      where: { id },
      data: {
        nome: unidade.nome,
        codigoCCEE: unidade.codigoCCEE,
        grupoEconomico: unidade.grupoEconomico,
        updatedAt: new Date(),
      },
      include: {
        subUnidades: {
          include: {
            estado: true,
            regiao: true,
            pontoDeMedicao: true,
          },
        },
      },
    });

    const subUnidades = updated.subUnidades.map((subUnidade) =>
      SubUnidade.create(
        subUnidade.nome,
        subUnidade.unidadeId,
        subUnidade.descricao,
        subUnidade.estadoId,
        subUnidade.estado
          ? {
              id: subUnidade.estado.id,
              sigla: subUnidade.estado.sigla,
              nome: subUnidade.estado.nome,
              regiaoId: subUnidade.estado.regiaoId,
              createdAt: subUnidade.estado.createdAt,
              updatedAt: subUnidade.estado.updatedAt,
            }
          : undefined,
        subUnidade.regiaoId,
        subUnidade.regiao
          ? {
              id: subUnidade.regiao.id,
              sigla: subUnidade.regiao.sigla,
              nome: subUnidade.regiao.nome,
              createdAt: subUnidade.regiao.createdAt,
              updatedAt: subUnidade.regiao.updatedAt,
            }
          : undefined,
        subUnidade.apeRemoto,
        subUnidade.apeLocal,
        subUnidade.codigoI5,
        subUnidade.codigoI0,
        subUnidade.codigoI100,
        subUnidade.codigoConv,
        subUnidade.cnpj,
        subUnidade.pontoDeMedicaoId,
        subUnidade.pontoDeMedicao
          ? {
              id: subUnidade.pontoDeMedicao.id,
              codigo: subUnidade.pontoDeMedicao.codigo,
              descricao: subUnidade.pontoDeMedicao.descricao,
              createdAt: subUnidade.pontoDeMedicao.createdAt,
              updatedAt: subUnidade.pontoDeMedicao.updatedAt,
            }
          : undefined,
        subUnidade.id,
        subUnidade.createdAt,
        subUnidade.updatedAt,
      ),
    );

    return Unidade.create(
      updated.nome,
      updated.codigoCCEE,
      updated.grupoEconomico,
      subUnidades,
      updated.id,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.unidades.delete({
      where: { id },
    });
  }
}
