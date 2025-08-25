import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CceeApiService } from './ccee-api.service';
import { CceePontoMedicaoService } from './ccee-ponto-medicao.service';
import { CceeMedidaCincoMinutosService } from './ccee-medida-cinco-minutos.service';
import { CCEE_PONTO_MEDICAO_SERVICE } from '../../domain/services/ccee-ponto-medicao.service';
import { CCEE_MEDIDA_CINCO_MINUTOS_SERVICE } from '../../domain/services/ccee-medida-cinco-minutos.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    CceeApiService,
    CceePontoMedicaoService,
    CceeMedidaCincoMinutosService,
    {
      provide: CCEE_PONTO_MEDICAO_SERVICE,
      useClass: CceePontoMedicaoService,
    },
    {
      provide: CCEE_MEDIDA_CINCO_MINUTOS_SERVICE,
      useClass: CceeMedidaCincoMinutosService,
    },
  ],
  exports: [
    CceeApiService,
    CceePontoMedicaoService,
    CceeMedidaCincoMinutosService,
    CCEE_PONTO_MEDICAO_SERVICE,
    CCEE_MEDIDA_CINCO_MINUTOS_SERVICE,
  ],
})
export class HttpModule {}
