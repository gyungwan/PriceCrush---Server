import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { CreateAuthDto } from './dto/create-auth.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtRefreshStrategy } from '../../common/auth/jwt-refresh.strategy';
import { jwtAccessStrategy } from 'src/common/auth/jwt-access.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
