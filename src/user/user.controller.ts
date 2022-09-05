import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class UsersService {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod()
  async register(registerDto: RegisterDto) {
    const result = await this.userService.register(registerDto);
    return result;
  }

  @GrpcMethod()
  async login(loginDto: LoginDto) {
    const result = await this.userService.login(loginDto);
    console.log(result);
    return result;
  }

  @GrpcStreamMethod()
  @UseGuards(JwtAuthGuard)
  async findAll(metaData: Metadata) {
    console.log(metaData);
    const result = await this.userService.findAll();
    return result;
  }

  @GrpcMethod()
  async findOne(data) {
    const result = await this.userService.findOne(data);
    console.log(result);
    return result;
  }

  @GrpcMethod()
  async update(@Payload() updateUserDto: UpdateUserDto) {
    const result = await this.userService.update(updateUserDto);
    console.log(result);
    return result;
  }

  @GrpcMethod()
  async remove(@Payload() id: number) {
    const result = await this.userService.remove(id);
    console.log(result);
    return result;
  }
}
