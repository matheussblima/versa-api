import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUnidadeRepository } from './repositories/prisma-unidade.repository';
import { PrismaPontoDeMedicaoRepository } from './repositories/prisma-ponto-de-medicao.repository';
import { PrismaSubUnidadeRepository } from './repositories/prisma-subunidade.repository';
import { UNIDADE_REPOSITORY } from '../../domain/repositories/unidade.repository.interface';
import { PONTO_DE_MEDICAO_REPOSITORY } from '../../domain/repositories/ponto-de-medicao.repository.interface';
import { SUBUNIDADE_REPOSITORY } from '../../domain/repositories/subunidade.repository.interface';

@Module({
  providers: [
    PrismaService,
    {
      provide: UNIDADE_REPOSITORY,
      useClass: PrismaUnidadeRepository,
    },
    {
      provide: PONTO_DE_MEDICAO_REPOSITORY,
      useClass: PrismaPontoDeMedicaoRepository,
    },
    {
      provide: SUBUNIDADE_REPOSITORY,
      useClass: PrismaSubUnidadeRepository,
    },
  ],
  exports: [
    PrismaService,
    UNIDADE_REPOSITORY,
    PONTO_DE_MEDICAO_REPOSITORY,
    SUBUNIDADE_REPOSITORY,
  ],
})
export class DatabaseModule {}
