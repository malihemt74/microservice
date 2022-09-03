import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      let user = await this.usersRepository.findOneBy({
        email: createUserDto['email'],
      });
      if (!user) {
        user = await this.usersRepository.save(createUserDto);
        user.password = undefined;
        return user;
      }
      return {
        statusCode: 406,
        message: 'User exists with this email.',
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        message: 'Internal Server Error.',
      };
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.usersRepository.findOneBy({
        email: loginUserDto['email'],
      });
      if (user) {
        const compare = await bcrypt.compare(
          loginUserDto['password'],
          user.password,
        );
        if (compare) {
          const payload = {
            sub: user.id,
            email: user.email,
          };
          return {
            user,
            access_token: await this.jwtService.sign(payload, {
              secret: process.env.APP_KEY,
              expiresIn: '216000s',
            }),
          };
        }
        return {
          status: 406,
          message: 'Password is not correct.',
        };
      }
      return {
        statusCode: 404,
        message: 'User Not Found',
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        message: 'Internal Server Error.',
      };
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        message: 'Internal Server Error.',
      };
    }
  }

  async findOne(id) {
    try {
      const user = await this.usersRepository.findOneBy({ id: id });
      return user;
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        message: 'Internal Server Error.',
      };
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOneBy({
        id: updateUserDto.id,
      });
      if (updateUserDto['username']) {
        user['username'] = updateUserDto['username'];
      }
      if (updateUserDto['email']) {
        user['email'] = updateUserDto['email'];
      }
      if (updateUserDto['password']) {
        user['password'] = bcrypt.hash(updateUserDto['password'], 10);
      }
      await this.usersRepository.save(user);
      return user;
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        message: 'Internal Server Error.',
      };
    }
  }

  async remove(id) {
    try {
      // const user = await this.usersRepository.findOneBy({ id: id });
      await this.usersRepository.delete(id);
      return {
        message: 'User deleted successfully.',
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        message: 'Internal Server Error.',
      };
    }
  }
}
