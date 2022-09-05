import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.controller';
import { User } from './entities/user.entity';
import { Token } from './entities/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.APP_KEY,
      signOptions: { expiresIn: '604800s' },
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [UsersService],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
