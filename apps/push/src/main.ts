import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { PushModule } from './push.module';

async function bootstrap() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(PushModule);

  app.listen();
}

bootstrap();
