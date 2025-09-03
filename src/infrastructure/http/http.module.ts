import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CceeApiService } from './ccee-api.service';
import { CceePontoMedicaoService } from './ccee-ponto-medicao.service';
import { CceeMedidaCincoMinutosService } from './ccee-medida-cinco-minutos.service';
import { CceeMedidaQuinzeMinutosService } from './ccee-medida-quinze-minutos.service';
import { CceePldService } from './ccee-pld.service';
import { CCEE_PONTO_MEDICAO_SERVICE } from '../../domain/services/ccee-ponto-medicao.service';
import { CCEE_MEDIDA_CINCO_MINUTOS_SERVICE } from '../../domain/services/ccee-medida-cinco-minutos.service';
import { CCEE_MEDIDA_QUINZE_MINUTOS_SERVICE } from '../../domain/services/ccee-medida-quinze-minutos.service';
import { CCEE_PLD_SERVICE } from '../../domain/services/ccee-pld.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    CceeApiService,
    CceePontoMedicaoService,
    CceeMedidaCincoMinutosService,
    CceeMedidaQuinzeMinutosService,
    CceePldService,
    {
      provide: CCEE_PONTO_MEDICAO_SERVICE,
      useClass: CceePontoMedicaoService,
    },
    {
      provide: CCEE_MEDIDA_CINCO_MINUTOS_SERVICE,
      useClass: CceeMedidaCincoMinutosService,
    },
    {
      provide: CCEE_MEDIDA_QUINZE_MINUTOS_SERVICE,
      useClass: CceeMedidaQuinzeMinutosService,
    },
    {
      provide: CCEE_PLD_SERVICE,
      useClass: CceePldService,
    },
  ],
  exports: [
    CceeApiService,
    CceePontoMedicaoService,
    CceeMedidaCincoMinutosService,
    CceeMedidaQuinzeMinutosService,
    CceePldService,
    CCEE_PONTO_MEDICAO_SERVICE,
    CCEE_MEDIDA_CINCO_MINUTOS_SERVICE,
    CCEE_MEDIDA_QUINZE_MINUTOS_SERVICE,
    CCEE_PLD_SERVICE,
  ],
})
export class HttpModule {}
