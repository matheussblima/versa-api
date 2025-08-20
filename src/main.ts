import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    .setDescription('API para gerenciamento de unidades e pontos de medição')
    .setVersion('1.0')
    .addTag('unidades', 'Operações relacionadas às unidades')
    .addTag('pontos-de-medicao', 'Operações relacionadas aos pontos de medição')
    .addTag('sync', 'Operações de sincronização')
    .addServer('http://localhost:3000', 'Servidor de Desenvolvimento')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Versa API - Documentação',
  });

  await app.listen(3000);
  console.log('🚀 Aplicação rodando em: http://localhost:3000');
  console.log('📚 Documentação Swagger em: http://localhost:3000/api');
}
bootstrap();
