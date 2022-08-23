import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { grpcOptions } from '../grpc.options';

@Injectable()
export class UsersService implements OnModuleInit {
  @Client({ ...grpcOptions })
  client: ClientGrpc;
  private usersService: UsersService;

  onModuleInit() {
    this.usersService = this.client.getService<UsersService>('UsersService');
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id) {
    return this.usersService.findOne({ id: 1 });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
