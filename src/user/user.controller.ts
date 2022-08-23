import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UsersService', 'Create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @GrpcMethod('UsersService', 'FindAll')
  async findAll() {
    const result = await this.userService.findAll();
    return result;
  }

  @GrpcMethod('UsersService', 'FindOne')
  async findOne(id, metadata, call) {
    // const result = await this.userService.findOne(id);
    return { id: id, name: 'm' };
  }

  @GrpcMethod('UsersService', 'Update')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @GrpcMethod('UsersService', 'Remove')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
