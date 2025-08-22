import { Injectable } from '@nestjs/common';
import { Regiao } from '../../../domain/entities/regiao.entity';
import { RegiaoRepositoryInterface } from '../../../domain/repositories/regiao.repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaRegiaoRepository implements RegiaoRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(regiao: Regiao): Promise<Regiao> {
    const created = await this.prisma.regiao.create({
      data: {
        id: regiao.id,
        sigla: regiao.sigla,
        nome: regiao.nome,
        createdAt: regiao.createdAt,
        updatedAt: regiao.updatedAt,
      },
    });

    return Regiao.create(
      created.sigla,
      created.nome,
      created.id,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(id: string): Promise<Regiao | null> {
    const found = await this.prisma.regiao.findUnique({
      where: { id },
    });

    if (!found) return null;

    return Regiao.create(
      found.sigla,
      found.nome,
      found.id,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findAll(): Promise<Regiao[]> {
    const found = await this.prisma.regiao.findMany();

    return found.map((item) =>
      Regiao.create(
        item.sigla,
        item.nome,
        item.id,
        item.createdAt,
        item.updatedAt,
      ),
    );
  }

  async update(id: string, regiao: Partial<Regiao>): Promise<Regiao> {
    const updated = await this.prisma.regiao.update({
      where: { id },
      data: {
        sigla: regiao.sigla,
        nome: regiao.nome,
        updatedAt: new Date(),
      },
    });

    return Regiao.create(
      updated.sigla,
      updated.nome,
      updated.id,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.regiao.delete({
      where: { id },
    });
  }
}
