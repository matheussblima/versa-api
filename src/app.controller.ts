import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './infrastructure/database/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    const dbHealth = await this.prismaService.healthCheck();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: {
        status: dbHealth ? 'connected' : 'disconnected',
        url: process.env.DATABASE_URL ? 'configured' : 'not_configured',
      },
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
