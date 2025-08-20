import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { HttpModule } from '../infrastructure/http/http.module';
import { CreateUnidadeUseCase } from './use-cases/unidade/create-unidade.use-case';
import { FindAllUnidadesUseCase } from './use-cases/unidade/find-all-unidades.use-case';
import { FindUnidadeByIdUseCase } from './use-cases/unidade/find-unidade-by-id.use-case';
import { UpdateUnidadeUseCase } from './use-cases/unidade/update-unidade.use-case';
import { DeleteUnidadeUseCase } from './use-cases/unidade/delete-unidade.use-case';
import { CreatePontoDeMedicaoUseCase } from './use-cases/ponto-de-medicao/create-ponto-de-medicao.use-case';
import { FindAllPontosDeMedicaoUseCase } from './use-cases/ponto-de-medicao/find-all-pontos-de-medicao.use-case';
import { FindPontoDeMedicaoByIdUseCase } from './use-cases/ponto-de-medicao/find-ponto-de-medicao-by-id.use-case';
import { FindPontosDeMedicaoByUnidadeUseCase } from './use-cases/ponto-de-medicao/find-pontos-de-medicao-by-unidade.use-case';
import { UpdatePontoDeMedicaoUseCase } from './use-cases/ponto-de-medicao/update-ponto-de-medicao.use-case';
import { DeletePontoDeMedicaoUseCase } from './use-cases/ponto-de-medicao/delete-ponto-de-medicao.use-case';
import { SyncExternalDataUseCase } from './use-cases/sync-external-data.use-case';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [
    CreateUnidadeUseCase,
    FindAllUnidadesUseCase,
    FindUnidadeByIdUseCase,
    UpdateUnidadeUseCase,
    DeleteUnidadeUseCase,
    CreatePontoDeMedicaoUseCase,
    FindAllPontosDeMedicaoUseCase,
    FindPontoDeMedicaoByIdUseCase,
    FindPontosDeMedicaoByUnidadeUseCase,
    UpdatePontoDeMedicaoUseCase,
    DeletePontoDeMedicaoUseCase,
    SyncExternalDataUseCase,
  ],
  exports: [
    CreateUnidadeUseCase,
    FindAllUnidadesUseCase,
    FindUnidadeByIdUseCase,
    UpdateUnidadeUseCase,
    DeleteUnidadeUseCase,
    CreatePontoDeMedicaoUseCase,
    FindAllPontosDeMedicaoUseCase,
    FindPontoDeMedicaoByIdUseCase,
    FindPontosDeMedicaoByUnidadeUseCase,
    UpdatePontoDeMedicaoUseCase,
    DeletePontoDeMedicaoUseCase,
    SyncExternalDataUseCase,
  ],
})
export class ApplicationModule {}
