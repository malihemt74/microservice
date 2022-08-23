import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcOptions } from '../grpc.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'user',
        ...grpcOptions,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
