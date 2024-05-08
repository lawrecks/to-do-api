import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('app.port');
  await app.listen(port, () => {
    Logger.log(`Application listening on port - ${port} 🔥`);
  });
}
bootstrap();
