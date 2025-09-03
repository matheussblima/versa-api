import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUnidadeRepository } from './repositories/prisma-unidade.repository';
import { PrismaPontoDeMedicaoRepository } from './repositories/prisma-ponto-de-medicao.repository';
import { PrismaSubUnidadeRepository } from './repositories/prisma-subunidade.repository';
import { PrismaRegiaoRepository } from './repositories/prisma-regiao.repository';
import { PrismaEstadoRepository } from './repositories/prisma-estado.repository';
import { MedidaQuinzeMinutosRepository } from './repositories/medida-quinze-minutos.repository';
import { PldRepository } from './repositories/pld.repository';
import { UNIDADE_REPOSITORY } from '../../domain/repositories/unidade.repository.interface';
import { PONTO_DE_MEDICAO_REPOSITORY } from '../../domain/repositories/ponto-de-medicao.repository.interface';
import { SUBUNIDADE_REPOSITORY } from '../../domain/repositories/subunidade.repository.interface';
import { REGIAO_REPOSITORY } from '../../domain/repositories/regiao.repository.interface';
import { ESTADO_REPOSITORY } from '../../domain/repositories/estado.repository.interface';
import { MEDIDA_QUINZE_MINUTOS_REPOSITORY } from '../../domain/repositories/medida-quinze-minutos.repository.interface';
import { PLD_REPOSITORY } from '../../domain/repositories/pld.repository.interface';

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
    {
      provide: REGIAO_REPOSITORY,
      useClass: PrismaRegiaoRepository,
    },
    {
      provide: ESTADO_REPOSITORY,
      useClass: PrismaEstadoRepository,
    },
    {
      provide: MEDIDA_QUINZE_MINUTOS_REPOSITORY,
      useClass: MedidaQuinzeMinutosRepository,
    },
    {
      provide: PLD_REPOSITORY,
      useClass: PldRepository,
    },
  ],
  exports: [
    PrismaService,
    UNIDADE_REPOSITORY,
    PONTO_DE_MEDICAO_REPOSITORY,
    SUBUNIDADE_REPOSITORY,
    REGIAO_REPOSITORY,
    ESTADO_REPOSITORY,
    MEDIDA_QUINZE_MINUTOS_REPOSITORY,
    PLD_REPOSITORY,
  ],
})
export class DatabaseModule {}
