import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { SafeGuard } from './guards/safe.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [process.env.FRONTEND_URL]
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true,
    validateCustomDecorators: true
  }))

  app.use(loggerMiddleware)
  // this is global guard
  // app.useGlobalGuards(new SafeGuard)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
