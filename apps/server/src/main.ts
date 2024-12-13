/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Demo Nx Repo')
    .setDescription('The API demo')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const globalPrefix = 'api';
  const openAPIPrefix = 'swagger';
  SwaggerModule.setup(openAPIPrefix, app, documentFactory);
  const port = process.env.PORT || 3000;
  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${openAPIPrefix}`
  );
}

bootstrap();
