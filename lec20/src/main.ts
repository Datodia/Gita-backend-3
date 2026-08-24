import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { SafeGuard } from './guards/safe.guard';
import { Logger } from 'pino-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bufferLogs: true});

  app.useLogger(app.get(Logger))

  app.enableCors({
    origin: [process.env.FRONTEND_URL]
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true,
    validateCustomDecorators: true
  }))

  // app.use(loggerMiddleware)
  // this is global guard
  // app.useGlobalGuards(new SafeGuard)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
