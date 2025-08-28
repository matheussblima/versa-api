import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Versa API')
    .setDescription('API para gerenciamento de unidades e subunidades')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Servidor de Desenvolvimento')
    .addServer('https://versa-api-orpin.vercel.app', 'Servidor de Produção')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Versa API - Documentação',
    customCss: '.swagger-ui .topbar { display: none }',
    customJs: [
      'https://unpkg.com/swagger-ui-dist@5.21.0/swagger-ui-bundle.js',
      'https://unpkg.com/swagger-ui-dist@5.21.0/swagger-ui-standalone-preset.js',
    ],
    customCssUrl: ['https://unpkg.com/swagger-ui-dist@5.21.0/swagger-ui.css'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Aplicação rodando em: http://localhost:${port}`);
  console.log(`📚 Documentação Swagger em: http://localhost:${port}/api`);
}
bootstrap();
