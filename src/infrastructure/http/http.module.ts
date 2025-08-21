import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CceeApiService } from './ccee-api.service';
import { CceePontoMedicaoService } from './ccee-ponto-medicao.service';
import { CCEE_PONTO_MEDICAO_SERVICE } from '../../domain/services/ccee-ponto-medicao.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    CceeApiService,
    CceePontoMedicaoService,
    {
      provide: CCEE_PONTO_MEDICAO_SERVICE,
      useClass: CceePontoMedicaoService,
    },
  ],
  exports: [
    CceeApiService,
    CceePontoMedicaoService,
    CCEE_PONTO_MEDICAO_SERVICE,
  ],
})
export class HttpModule {}
