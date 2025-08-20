import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SyncExternalDataUseCase } from '../../application/use-cases/sync-external-data.use-case';

@ApiTags('sync')
@Controller('sync')
export class SyncController {
  constructor(
    private readonly syncExternalDataUseCase: SyncExternalDataUseCase,
  ) {}

  @Post('external-data')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sincronizar dados externos' })
  @ApiResponse({
    status: 200,
    description: 'Sincronização iniciada com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Sincronização iniciada com sucesso',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
  })
  async syncExternalData() {
    await this.syncExternalDataUseCase.execute();
    return { message: 'Sincronização iniciada com sucesso' };
  }
}
