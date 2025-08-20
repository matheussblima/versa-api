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
        nome: pontoDeMedicao.nome,
        descricao: pontoDeMedicao.descricao,
        subUnidadeId: pontoDeMedicao.subUnidadeId,
        createdAt: pontoDeMedicao.createdAt,
        updatedAt: pontoDeMedicao.updatedAt,
      },
    });

    return PontoDeMedicao.create(
      created.nome,
      created.subUnidadeId,
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
      found.nome,
      found.subUnidadeId,
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
        item.nome,
        item.subUnidadeId,
        item.descricao,
        item.id,
        item.createdAt,
        item.updatedAt,
      ),
    );
  }

  async findBySubUnidadeId(subUnidadeId: string): Promise<PontoDeMedicao[]> {
    const found = await this.prisma.pontoDeMedicao.findMany({
      where: { subUnidadeId },
    });

    return found.map((item) =>
      PontoDeMedicao.create(
        item.nome,
        item.subUnidadeId,
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
        nome: pontoDeMedicao.nome,
        descricao: pontoDeMedicao.descricao,
        subUnidadeId: pontoDeMedicao.subUnidadeId,
        updatedAt: new Date(),
      },
    });

    return PontoDeMedicao.create(
      updated.nome,
      updated.subUnidadeId,
      updated.descricao,
      updated.id,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.pontoDeMedicao.delete({
      where: { id },
    });
  }
}
