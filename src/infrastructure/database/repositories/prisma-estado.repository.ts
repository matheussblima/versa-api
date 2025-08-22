import { Injectable } from '@nestjs/common';
import { Estado } from '../../../domain/entities/estado.entity';
import { EstadoRepositoryInterface } from '../../../domain/repositories/estado.repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaEstadoRepository implements EstadoRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(estado: Estado): Promise<Estado> {
    const created = await this.prisma.estado.create({
      data: {
        id: estado.id,
        sigla: estado.sigla,
        nome: estado.nome,
        regiaoId: estado.regiaoId,
        createdAt: estado.createdAt,
        updatedAt: estado.updatedAt,
      },
      include: {
        regiao: true,
      },
    });

    return Estado.create(
      created.sigla,
      created.nome,
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
      created.id,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(id: string): Promise<Estado | null> {
    const found = await this.prisma.estado.findUnique({
      where: { id },
      include: {
        regiao: true,
      },
    });

    if (!found) return null;

    return Estado.create(
      found.sigla,
      found.nome,
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
      found.id,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findAll(): Promise<Estado[]> {
    const found = await this.prisma.estado.findMany({
      include: {
        regiao: true,
      },
    });

    return found.map((item) =>
      Estado.create(
        item.sigla,
        item.nome,
        item.regiaoId,
        item.regiao
          ? {
              id: item.regiao.id,
              sigla: item.regiao.sigla,
              nome: item.regiao.nome,
              createdAt: item.regiao.createdAt,
              updatedAt: item.regiao.updatedAt,
            }
          : undefined,
        item.id,
        item.createdAt,
        item.updatedAt,
      ),
    );
  }

  async findByRegiaoId(regiaoId: string): Promise<Estado[]> {
    const found = await this.prisma.estado.findMany({
      where: { regiaoId },
      include: {
        regiao: true,
      },
    });

    return found.map((item) =>
      Estado.create(
        item.sigla,
        item.nome,
        item.regiaoId,
        item.regiao
          ? {
              id: item.regiao.id,
              sigla: item.regiao.sigla,
              nome: item.regiao.nome,
              createdAt: item.regiao.createdAt,
              updatedAt: item.regiao.updatedAt,
            }
          : undefined,
        item.id,
        item.createdAt,
        item.updatedAt,
      ),
    );
  }

  async update(id: string, estado: Partial<Estado>): Promise<Estado> {
    const updated = await this.prisma.estado.update({
      where: { id },
      data: {
        sigla: estado.sigla,
        nome: estado.nome,
        regiaoId: estado.regiaoId,
        updatedAt: new Date(),
      },
      include: {
        regiao: true,
      },
    });

    return Estado.create(
      updated.sigla,
      updated.nome,
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
      updated.id,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.estado.delete({
      where: { id },
    });
  }
}
