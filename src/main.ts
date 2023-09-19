import { NestFactory } from '@nestjs/core';
import { EpicApiModule } from './epic-api/epic-api.module';

async function bootstrap() {
  const app = await NestFactory.create(EpicApiModule);
  await app.listen(3000);
}

bootstrap();
