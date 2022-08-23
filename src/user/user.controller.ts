import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'Create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @GrpcMethod('UsersService', 'FindAll')
  async findAll() {
    const result = await this.usersService.findAll();
    return result;
  }

  @GrpcMethod('UsersService', 'FindOne')
  async findOne(id, metadata, call) {
    const result = await this.usersService.findOne(id);
    return result;
  }

  @GrpcMethod('UsersService', 'Update')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @GrpcMethod('UsersService', 'Remove')
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
