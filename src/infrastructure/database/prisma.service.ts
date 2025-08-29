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

  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error('Falha no health check do banco de dados:', error);
      return false;
    }
  }
}
