import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';

Logger.log(process.env.PORT, 'Bootstrap');
const PORT = Number(process.env.PORT) || 8080;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const options = new DocumentBuilder()
      .setTitle('IdeasAPI')
      .setDescription('API for sharing the ideas')
      .setVersion('1.0')
      .addTag('ideas')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('documentation', app, document);

    Logger.log(PORT);
    await app.listen(PORT);
    Logger.log(`Server running on ${PORT}`, 'Bootstrap');
  } catch (e) {
    Logger.log(e);
  }
}

bootstrap();
