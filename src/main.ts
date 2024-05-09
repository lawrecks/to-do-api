import {
  Logger,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const validationErrors = {};

        errors.map((err) => {
          validationErrors[err.property] = [];

          for (const property in err.constraints) {
            if (err.constraints.hasOwnProperty(property)) {
              validationErrors[err.property].push(err.constraints[property]);
            }
          }
        });

        throw new UnprocessableEntityException({
          message: 'Validation error occurred',
          errors: validationErrors,
        });
      },
    }),
  );

  const port = configService.get('app.port');
  await app.listen(port, () => {
    Logger.log(`Application listening on port - ${port} 🔥`);
  });
}
bootstrap();
