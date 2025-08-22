import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { UnidadeController } from './controllers/unidade.controller';
import { SubUnidadeController } from './controllers/subunidade.controller';
import { PontoDeMedicaoController } from './controllers/ponto-de-medicao.controller';
import { RegiaoController } from './controllers/regiao.controller';
import { EstadoController } from './controllers/estado.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [
    UnidadeController,
    SubUnidadeController,
    PontoDeMedicaoController,
    RegiaoController,
    EstadoController,
  ],
})
export class InterfacesModule {}
