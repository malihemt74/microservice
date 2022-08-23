import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: process.cwd() + '/src/user/user.proto',
    url: 'localhost:5000',
  },
};
