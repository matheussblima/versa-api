import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { UnidadeController } from './controllers/unidade.controller';
import { PontoDeMedicaoController } from './controllers/ponto-de-medicao.controller';
import { SyncController } from './controllers/sync.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [UnidadeController, PontoDeMedicaoController, SyncController],
})
export class InterfacesModule {}
