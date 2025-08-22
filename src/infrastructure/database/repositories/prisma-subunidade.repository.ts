import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SubUnidadeRepositoryInterface } from '../../../domain/repositories/subunidade.repository.interface';
import { SubUnidade } from '../../../domain/entities/subunidade.entity';

@Injectable()
export class PrismaSubUnidadeRepository
  implements SubUnidadeRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async create(subUnidade: SubUnidade): Promise<SubUnidade> {
    const created = await this.prisma.subUnidade.create({
      data: {
        id: subUnidade.id,
        nome: subUnidade.nome,
        descricao: subUnidade.descricao,
        estadoId: subUnidade.estadoId,
        regiaoId: subUnidade.regiaoId,
        apeRemoto: subUnidade.apeRemoto,
        apeLocal: subUnidade.apeLocal,
        codigoI5: subUnidade.codigoI5,
        codigoI0: subUnidade.codigoI0,
        codigoI100: subUnidade.codigoI100,
        codigoConv: subUnidade.codigoConv,
        cnpj: subUnidade.cnpj,
        unidadeId: subUnidade.unidadeId,
        createdAt: subUnidade.createdAt,
        updatedAt: subUnidade.updatedAt,
      },
      include: {
        estado: true,
        regiao: true,
      },
    });

    return SubUnidade.create(
      created.nome,
      created.unidadeId,
      created.descricao,
      created.estadoId,
      created.estado
        ? {
            id: created.estado.id,
            sigla: created.estado.sigla,
            nome: created.estado.nome,
            regiaoId: created.estado.regiaoId,
            createdAt: created.estado.createdAt,
            updatedAt: created.estado.updatedAt,
          }
        : undefined,
      created.regiaoId,
      created.regiao
        ? {
            id: created.regiao.id,
            sigla: created.regiao.sigla,
            nome: created.regiao.nome,
            createdAt: created.regiao.createdAt,
            updatedAt: created.regiao.updatedAt,
          }
        : undefined,
      created.apeRemoto,
      created.apeLocal,
      created.codigoI5,
      created.codigoI0,
      created.codigoI100,
      created.codigoConv,
      created.cnpj,
      created.id,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(id: string): Promise<SubUnidade | null> {
    const found = await this.prisma.subUnidade.findUnique({
      where: { id },
      include: {
        estado: true,
        regiao: true,
      },
    });

    if (!found) return null;

    return SubUnidade.create(
      found.nome,
      found.unidadeId,
      found.descricao,
      found.estadoId,
      found.estado
        ? {
            id: found.estado.id,
            sigla: found.estado.sigla,
            nome: found.estado.nome,
            regiaoId: found.estado.regiaoId,
            createdAt: found.estado.createdAt,
            updatedAt: found.estado.updatedAt,
          }
        : undefined,
      found.regiaoId,
      found.regiao
        ? {
            id: found.regiao.id,
            sigla: found.regiao.sigla,
            nome: found.regiao.nome,
            createdAt: found.regiao.createdAt,
            updatedAt: found.regiao.updatedAt,
          }
        : undefined,
      found.apeRemoto,
      found.apeLocal,
      found.codigoI5,
      found.codigoI0,
      found.codigoI100,
      found.codigoConv,
      found.cnpj,
      found.id,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findAll(): Promise<SubUnidade[]> {
    const found = await this.prisma.subUnidade.findMany({
      include: {
        estado: true,
        regiao: true,
      },
    });

    return found.map((subUnidade) =>
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
        subUnidade.id,
        subUnidade.createdAt,
        subUnidade.updatedAt,
      ),
    );
  }

  async findByUnidadeId(unidadeId: string): Promise<SubUnidade[]> {
    const found = await this.prisma.subUnidade.findMany({
      where: { unidadeId },
      include: {
        estado: true,
        regiao: true,
      },
    });

    return found.map((subUnidade) =>
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
        subUnidade.id,
        subUnidade.createdAt,
        subUnidade.updatedAt,
      ),
    );
  }

  async update(
    id: string,
    subUnidade: Partial<SubUnidade>,
  ): Promise<SubUnidade> {
    const updated = await this.prisma.subUnidade.update({
      where: { id },
      data: {
        nome: subUnidade.nome,
        descricao: subUnidade.descricao,
        estadoId: subUnidade.estadoId,
        regiaoId: subUnidade.regiaoId,
        apeRemoto: subUnidade.apeRemoto,
        apeLocal: subUnidade.apeLocal,
        codigoI5: subUnidade.codigoI5,
        codigoI0: subUnidade.codigoI0,
        codigoI100: subUnidade.codigoI100,
        codigoConv: subUnidade.codigoConv,
        cnpj: subUnidade.cnpj,
        updatedAt: new Date(),
      },
      include: {
        estado: true,
        regiao: true,
      },
    });

    return SubUnidade.create(
      updated.nome,
      updated.unidadeId,
      updated.descricao,
      updated.estadoId,
      updated.estado
        ? {
            id: updated.estado.id,
            sigla: updated.estado.sigla,
            nome: updated.estado.nome,
            regiaoId: updated.estado.regiaoId,
            createdAt: updated.estado.createdAt,
            updatedAt: updated.estado.updatedAt,
          }
        : undefined,
      updated.regiaoId,
      updated.regiao
        ? {
            id: updated.regiao.id,
            sigla: updated.regiao.sigla,
            nome: updated.regiao.nome,
            createdAt: updated.regiao.createdAt,
            updatedAt: updated.regiao.updatedAt,
          }
        : undefined,
      updated.apeRemoto,
      updated.apeLocal,
      updated.codigoI5,
      updated.codigoI0,
      updated.codigoI100,
      updated.codigoConv,
      updated.cnpj,
      updated.id,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.subUnidade.delete({
      where: { id },
    });
  }
}
