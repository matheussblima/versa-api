import { Module } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { ExternalDataHttpService } from './external-data-http.service';
import { EXTERNAL_DATA_SERVICE } from '../../domain/services/external-data.service';

@Module({
  providers: [
    ExternalApiService,
    {
      provide: EXTERNAL_DATA_SERVICE,
      useClass: ExternalDataHttpService,
    },
  ],
  exports: [ExternalApiService, EXTERNAL_DATA_SERVICE],
})
export class HttpModule {}
