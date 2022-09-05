import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { grpcOptions } from './grpc.options';

async function bootstrap() {
  // await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   grpcOptions,
  // );
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(grpcOptions);
  await app.startAllMicroservices();
}
bootstrap();
