import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: process.cwd() + '/src/proto/user.proto',
    // loader: {
    //   includeDirs: [process.cwd() + '/src/proto'],
    // },
  },
};
