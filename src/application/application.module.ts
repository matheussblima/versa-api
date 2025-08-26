import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { HttpModule } from '../infrastructure/http/http.module';
import { CreateUnidadeUseCase } from './use-cases/unidade/create-unidade.use-case';
import { FindAllUnidadesUseCase } from './use-cases/unidade/find-all-unidades.use-case';
import { FindUnidadeByIdUseCase } from './use-cases/unidade/find-unidade-by-id.use-case';
import { UpdateUnidadeUseCase } from './use-cases/unidade/update-unidade.use-case';
import { DeleteUnidadeUseCase } from './use-cases/unidade/delete-unidade.use-case';
import { CreateSubUnidadeUseCase } from './use-cases/subunidade/create-subunidade.use-case';
import { FindAllSubUnidadesUseCase } from './use-cases/subunidade/find-all-subunidades.use-case';
import { FindSubUnidadeByIdUseCase } from './use-cases/subunidade/find-subunidade-by-id.use-case';
import { UpdateSubUnidadeUseCase } from './use-cases/subunidade/update-subunidade.use-case';
import { DeleteSubUnidadeUseCase } from './use-cases/subunidade/delete-subunidade.use-case';
import { CreatePontoDeMedicaoUseCase } from './use-cases/ponto-de-medicao/create-ponto-de-medicao.use-case';
import { FindAllPontosDeMedicaoUseCase } from './use-cases/ponto-de-medicao/find-all-pontos-de-medicao.use-case';
import { FindPontoDeMedicaoByIdUseCase } from './use-cases/ponto-de-medicao/find-ponto-de-medicao-by-id.use-case';
import { FindPontosDeMedicaoByUnidadeUseCase } from './use-cases/ponto-de-medicao/find-pontos-de-medicao-by-unidade.use-case';
import { FindPontosDeMedicaoBySubUnidadeUseCase } from './use-cases/ponto-de-medicao/find-pontos-de-medicao-by-subunidade.use-case';
import { FindAvailablePontosDeMedicaoUseCase } from './use-cases/ponto-de-medicao/find-available-pontos-de-medicao.use-case';
import { SearchPontosDeMedicaoCceeUseCase } from './use-cases/ponto-de-medicao/search-pontos-de-medicao-ccee.use-case';
import { UpdatePontoDeMedicaoUseCase } from './use-cases/ponto-de-medicao/update-ponto-de-medicao.use-case';
import { DeletePontoDeMedicaoUseCase } from './use-cases/ponto-de-medicao/delete-ponto-de-medicao.use-case';
import { CreateRegiaoUseCase } from './use-cases/regiao/create-regiao.use-case';
import { FindAllRegioesUseCase } from './use-cases/regiao/find-all-regioes.use-case';
import { FindRegiaoByIdUseCase } from './use-cases/regiao/find-regiao-by-id.use-case';
import { UpdateRegiaoUseCase } from './use-cases/regiao/update-regiao.use-case';
import { DeleteRegiaoUseCase } from './use-cases/regiao/delete-regiao.use-case';
import { CreateEstadoUseCase } from './use-cases/estado/create-estado.use-case';
import { FindAllEstadosUseCase } from './use-cases/estado/find-all-estados.use-case';
import { FindEstadoByIdUseCase } from './use-cases/estado/find-estado-by-id.use-case';
import { FindEstadosByRegiaoUseCase } from './use-cases/estado/find-estados-by-regiao.use-case';
import { UpdateEstadoUseCase } from './use-cases/estado/update-estado.use-case';
import { DeleteEstadoUseCase } from './use-cases/estado/delete-estado.use-case';
import { SearchMedidasCincoMinutosCceeUseCase } from './use-cases/medida-cinco-minutos/search-medidas-cinco-minutos-ccee.use-case';
import { SearchMedidasQuinzeMinutosCceeUseCase } from './use-cases/medida-quinze-minutos/search-medidas-quinze-minutos-ccee.use-case';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [
    CreateUnidadeUseCase,
    FindAllUnidadesUseCase,
    FindUnidadeByIdUseCase,
    UpdateUnidadeUseCase,
    DeleteUnidadeUseCase,
    CreateSubUnidadeUseCase,
    FindAllSubUnidadesUseCase,
    FindSubUnidadeByIdUseCase,
    UpdateSubUnidadeUseCase,
    DeleteSubUnidadeUseCase,
    CreatePontoDeMedicaoUseCase,
    FindAllPontosDeMedicaoUseCase,
    FindPontoDeMedicaoByIdUseCase,
    FindPontosDeMedicaoByUnidadeUseCase,
    FindPontosDeMedicaoBySubUnidadeUseCase,
    FindAvailablePontosDeMedicaoUseCase,
    SearchPontosDeMedicaoCceeUseCase,
    UpdatePontoDeMedicaoUseCase,
    DeletePontoDeMedicaoUseCase,
    CreateRegiaoUseCase,
    FindAllRegioesUseCase,
    FindRegiaoByIdUseCase,
    UpdateRegiaoUseCase,
    DeleteRegiaoUseCase,
    CreateEstadoUseCase,
    FindAllEstadosUseCase,
    FindEstadoByIdUseCase,
    FindEstadosByRegiaoUseCase,
    UpdateEstadoUseCase,
    DeleteEstadoUseCase,
    SearchMedidasCincoMinutosCceeUseCase,
    SearchMedidasQuinzeMinutosCceeUseCase,
  ],
  exports: [
    CreateUnidadeUseCase,
    FindAllUnidadesUseCase,
    FindUnidadeByIdUseCase,
    UpdateUnidadeUseCase,
    DeleteUnidadeUseCase,
    CreateSubUnidadeUseCase,
    FindAllSubUnidadesUseCase,
    FindSubUnidadeByIdUseCase,
    UpdateSubUnidadeUseCase,
    DeleteSubUnidadeUseCase,
    CreatePontoDeMedicaoUseCase,
    FindAllPontosDeMedicaoUseCase,
    FindPontoDeMedicaoByIdUseCase,
    FindPontosDeMedicaoByUnidadeUseCase,
    FindPontosDeMedicaoBySubUnidadeUseCase,
    FindAvailablePontosDeMedicaoUseCase,
    SearchPontosDeMedicaoCceeUseCase,
    UpdatePontoDeMedicaoUseCase,
    DeletePontoDeMedicaoUseCase,
    CreateRegiaoUseCase,
    FindAllRegioesUseCase,
    FindRegiaoByIdUseCase,
    UpdateRegiaoUseCase,
    DeleteRegiaoUseCase,
    CreateEstadoUseCase,
    FindAllEstadosUseCase,
    FindEstadoByIdUseCase,
    FindEstadosByRegiaoUseCase,
    UpdateEstadoUseCase,
    DeleteEstadoUseCase,
    SearchMedidasCincoMinutosCceeUseCase,
    SearchMedidasQuinzeMinutosCceeUseCase,
  ],
})
export class ApplicationModule {}
