import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { UnidadeController } from './controllers/unidade.controller';
import { SubUnidadeController } from './controllers/subunidade.controller';
import { PontoDeMedicaoController } from './controllers/ponto-de-medicao.controller';
import { RegiaoController } from './controllers/regiao.controller';
import { EstadoController } from './controllers/estado.controller';
import { MedidaCincoMinutosController } from './controllers/medida-cinco-minutos.controller';
import { MedidaQuinzeMinutosController } from './controllers/medida-quinze-minutos.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [
    UnidadeController,
    SubUnidadeController,
    PontoDeMedicaoController,
    RegiaoController,
    EstadoController,
    MedidaCincoMinutosController,
    MedidaQuinzeMinutosController,
  ],
})
export class InterfacesModule {}
