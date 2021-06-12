import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';
import { FallbackExceptionFilter } from './error/fallback.filter';
import { HttpExceptionFilter } from './error/http.filter';
import { ValidationException } from './error/validation.exception';
import { ValidationFilter } from './error/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.reduce((prev: string[], current) => {
          if (current.constraints) {
            prev.push(...Object.values(current.constraints));
          }
          return prev;
        }, []);
        return new ValidationException(messages);
      },
    }),
  );

  await app.listen(config.port);
}
bootstrap();
