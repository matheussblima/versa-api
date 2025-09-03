import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { SchedulerModule } from '../infrastructure/scheduler/scheduler.module';
import { UnidadeController } from './controllers/unidade.controller';
import { SubUnidadeController } from './controllers/subunidade.controller';
import { PontoDeMedicaoController } from './controllers/ponto-de-medicao.controller';
import { RegiaoController } from './controllers/regiao.controller';
import { EstadoController } from './controllers/estado.controller';
import { MedidaCincoMinutosController } from './controllers/medida-cinco-minutos.controller';
import { MedidaQuinzeMinutosController } from './controllers/medida-quinze-minutos-ccee.controller';
import { MedidaQuinzeMinutosCrudController } from './controllers/medida-quinze-minutos.controller';
import { MedidaQuinzeMinutosSyncController } from './controllers/medida-quinze-minutos-sync.controller';
import { SchedulerController } from './controllers/scheduler.controller';
import { PldCrudController } from './controllers/pld.controller';
import { PldCceeController } from './controllers/pld-ccee.controller';

@Module({
  imports: [ApplicationModule, SchedulerModule],
  controllers: [
    UnidadeController,
    SubUnidadeController,
    PontoDeMedicaoController,
    RegiaoController,
    EstadoController,
    MedidaCincoMinutosController,
    MedidaQuinzeMinutosController,
    MedidaQuinzeMinutosCrudController,
    MedidaQuinzeMinutosSyncController,
    SchedulerController,
    PldCrudController,
    PldCceeController,
  ],
})
export class InterfacesModule {}
