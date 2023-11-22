import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.enableCors({
    origin: ['http://localhost:3000', 'https://e-commerce-web-eta.vercel.app'], // Allow requests from your frontend application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers)
  });
  console.log('process.env.DATABASE_HOST', process.env);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
