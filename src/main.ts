import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Sentry.init({
    dsn: process.env.SENTRY_DSN_URL,
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
