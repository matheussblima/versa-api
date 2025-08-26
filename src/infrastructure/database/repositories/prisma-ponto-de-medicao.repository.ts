import { Injectable } from '@nestjs/common';
import { PontoDeMedicao } from '../../../domain/entities/ponto-de-medicao.entity';
import { IPontoDeMedicaoRepository } from '../../../domain/repositories/ponto-de-medicao.repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaPontoDeMedicaoRepository
  implements IPontoDeMedicaoRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(pontoDeMedicao: PontoDeMedicao): Promise<PontoDeMedicao> {
    const created = await this.prisma.pontoDeMedicao.create({
      data: {
        id: pontoDeMedicao.id,
        codigo: pontoDeMedicao.codigo,
        descricao: pontoDeMedicao.descricao,
        createdAt: pontoDeMedicao.createdAt,
        updatedAt: pontoDeMedicao.updatedAt,
      },
    });

    return PontoDeMedicao.create(
      created.codigo,
      created.descricao,
      created.id,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(id: string): Promise<PontoDeMedicao | null> {
    const found = await this.prisma.pontoDeMedicao.findUnique({
      where: { id },
    });

    if (!found) return null;

    return PontoDeMedicao.create(
      found.codigo,
      found.descricao,
      found.id,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findByCodigo(codigo: string): Promise<PontoDeMedicao | null> {
    const found = await this.prisma.pontoDeMedicao.findUnique({
      where: { codigo },
    });

    if (!found) return null;

    return PontoDeMedicao.create(
      found.codigo,
      found.descricao,
      found.id,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findAll(): Promise<PontoDeMedicao[]> {
    const found = await this.prisma.pontoDeMedicao.findMany();

    return found.map((item) =>
      PontoDeMedicao.create(
        item.codigo,
        item.descricao,
        item.id,
        item.createdAt,
        item.updatedAt,
      ),
    );
  }

  async findAvailable(): Promise<PontoDeMedicao[]> {
    const found = await this.prisma.pontoDeMedicao.findMany({
      where: {
        subUnidade: null,
      },
    });

    return found.map((item) =>
      PontoDeMedicao.create(
        item.codigo,
        item.descricao,
        item.id,
        item.createdAt,
        item.updatedAt,
      ),
    );
  }

  async update(
    id: string,
    pontoDeMedicao: Partial<PontoDeMedicao>,
  ): Promise<PontoDeMedicao> {
    const updated = await this.prisma.pontoDeMedicao.update({
      where: { id },
      data: {
        codigo: pontoDeMedicao.codigo,
        descricao: pontoDeMedicao.descricao,
        updatedAt: new Date(),
      },
    });

    return PontoDeMedicao.create(
      updated.codigo,
      updated.descricao,
      updated.id,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async upsert(
    codigo: string,
    pontoDeMedicao: Partial<PontoDeMedicao>,
  ): Promise<PontoDeMedicao> {
    const upserted = await this.prisma.pontoDeMedicao.upsert({
      where: { codigo },
      update: {
        descricao: pontoDeMedicao.descricao,
        updatedAt: new Date(),
      },
      create: {
        codigo: codigo,
        descricao: pontoDeMedicao.descricao,
      },
    });

    return PontoDeMedicao.create(
      upserted.codigo,
      upserted.descricao,
      upserted.id,
      upserted.createdAt,
      upserted.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.pontoDeMedicao.delete({
      where: { id },
    });
  }
}
