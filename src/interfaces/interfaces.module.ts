import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { UnidadeController } from './controllers/unidade.controller';
import { SubUnidadeController } from './controllers/subunidade.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [UnidadeController, SubUnidadeController],
})
export class InterfacesModule {}
