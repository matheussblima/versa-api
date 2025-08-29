import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private readonly maxRetries = 5;
  private readonly retryDelay = 2000;

  constructor() {
    super({
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    this.$on('query', (e) => {
      this.logger.debug(`Query: ${e.query}`);
      this.logger.debug(`Params: ${e.params}`);
      this.logger.debug(`Duration: ${e.duration}ms`);
    });

    this.$on('error', (e) => {
      this.logger.error(`Prisma Error: ${e.message}`);

      if (
        e.message.includes('prepared statement') ||
        e.message.includes('already exists')
      ) {
        this.logger.warn(
          'Detectado erro de prepared statement. Tentando reconectar...',
        );
        this.handlePreparedStatementError();
      }
    });
  }

  async onModuleInit() {
    await this.connectWithRetry();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async connectWithRetry(): Promise<void> {
    let lastError: Error;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        this.logger.log(
          `Tentativa ${attempt}/${this.maxRetries} de conexão com o banco de dados...`,
        );
        await this.$connect();
        this.logger.log(
          '✅ Conexão com o banco de dados estabelecida com sucesso!',
        );
        return;
      } catch (error) {
        lastError = error as Error;
        this.logger.error(`❌ Tentativa ${attempt} falhou: ${error.message}`);

        if (attempt < this.maxRetries) {
          this.logger.log(
            `⏳ Aguardando ${this.retryDelay}ms antes da próxima tentativa...`,
          );
          await this.delay(this.retryDelay);
        }
      }
    }

    this.logger.error(
      `❌ Falha ao conectar após ${this.maxRetries} tentativas`,
    );
    throw lastError;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Método para lidar com erros de prepared statements
  private async handlePreparedStatementError(): Promise<void> {
    try {
      this.logger.log('🔄 Reconectando devido a erro de prepared statement...');
      await this.$disconnect();
      await this.delay(1000); // Aguardar 1 segundo
      await this.$connect();
      this.logger.log('✅ Reconexão bem-sucedida!');
    } catch (error) {
      this.logger.error('❌ Falha na reconexão:', error.message);
    }
  }

  // Método para executar queries com retry automático
  async executeWithRetry<T>(operation: () => Promise<T>): Promise<T> {
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        const errorMessage = error.message || '';

        if (
          errorMessage.includes('prepared statement') ||
          errorMessage.includes('already exists') ||
          errorMessage.includes('connection')
        ) {
          this.logger.warn(
            `Tentativa ${attempt}/${maxRetries} falhou: ${errorMessage}`,
          );

          if (attempt < maxRetries) {
            await this.handlePreparedStatementError();
            await this.delay(500 * attempt); // Delay progressivo
            continue;
          }
        }

        throw error;
      }
    }

    throw new Error('Máximo de tentativas excedido');
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.executeWithRetry(async () => {
        await this.$queryRaw`SELECT 1`;
      });
      return true;
    } catch (error) {
      this.logger.error('Falha no health check do banco de dados:', error);
      return false;
    }
  }
}
