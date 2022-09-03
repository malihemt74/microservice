import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/jwt-auth.gaurd';

@Controller()
export class UsersService {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod()
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @GrpcMethod()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @GrpcMethod()
  @UseGuards(JwtAuthGuard)
  findOne(id) {
    return this.userService.findOne(id);
  }

  @GrpcMethod()
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @GrpcMethod()
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
