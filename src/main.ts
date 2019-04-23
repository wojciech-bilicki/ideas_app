import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

Logger.log(process.env.PORT, 'Bootstrap');
const PORT = Number(process.env.PORT) || 8080;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    Logger.log(PORT);
    await app.listen(PORT);
    Logger.log(`Server running on ${PORT}`, 'Bootstrap');
  } catch (e) {
    Logger.log(e);
  }
}

bootstrap();
