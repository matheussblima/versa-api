import { Injectable } from '@nestjs/common';
import { Unidade } from '../../../domain/entities/unidade.entity';
import { IUnidadeRepository } from '../../../domain/repositories/unidade.repository.interface';
import { PrismaService } from '../prisma.service';

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
      created.id,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(id: string): Promise<Unidade | null> {
    const found = await this.prisma.unidades.findUnique({
      where: { id },
    });

    if (!found) return null;

    return Unidade.create(
      found.nome,
      found.codigoCCEE,
      found.grupoEconomico,
      found.id,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findAll(): Promise<Unidade[]> {
    const found = await this.prisma.unidades.findMany();

    return found.map((item) =>
      Unidade.create(
        item.nome,
        item.codigoCCEE,
        item.grupoEconomico,
        item.id,
        item.createdAt,
        item.updatedAt,
      ),
    );
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
    });

    return Unidade.create(
      updated.nome,
      updated.codigoCCEE,
      updated.grupoEconomico,
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
