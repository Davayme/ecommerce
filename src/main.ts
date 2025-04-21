import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use('/payments/webhook', bodyParser.raw({ type: 'application/json' }));
  await app.listen(process.env.PORT ?? 3000);
  setInterval(() => {
    const used = process.memoryUsage();
    console.log(`Memory Usage: RSS=${(used.rss / 1024 / 1024).toFixed(2)} MB, Heap=${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }, 10000); // Cada 10 segundos
}
bootstrap();