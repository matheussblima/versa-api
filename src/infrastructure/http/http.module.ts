import { Module } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { ExternalDataHttpService } from './external-data-http.service';
import { CceeApiService } from './ccee-api.service';
import { EXTERNAL_DATA_SERVICE } from '../../domain/services/external-data.service';

@Module({
  providers: [
    ExternalApiService,
    CceeApiService,
    {
      provide: EXTERNAL_DATA_SERVICE,
      useClass: ExternalDataHttpService,
    },
  ],
  exports: [ExternalApiService, CceeApiService, EXTERNAL_DATA_SERVICE],
})
export class HttpModule {}
