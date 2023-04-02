import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { jwtAccessStrategy } from 'src/common/auth/jwt-access.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [jwtAccessStrategy, UsersService],
})
export class UsersModule {}
