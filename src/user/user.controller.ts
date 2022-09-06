import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

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
  async findAll() {
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
  async update(updateUserDto: UpdateUserDto) {
    const result = await this.userService.update(updateUserDto);
    console.log(result);
    return result;
  }

  @GrpcMethod()
  async remove(data) {
    const result = await this.userService.remove(data);
    console.log(result);
    return result;
  }

  @GrpcMethod()
  async checkUserToken(data) {
    const result = await this.userService.checkUserToken(data);
    console.log(result);
    return result;
  }
}
