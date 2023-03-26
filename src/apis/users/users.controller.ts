import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { FindUserResponseDto } from './dto/find-user.response.dto';

@Controller('users')
@ApiTags('유저 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @ApiOperation({
    summary: '유저 회원가입',
    description: '유저 회원가입 API',
  })
  @ApiResponse({
    description: '회원가입한 회원정보가 리턴됩니다',
    type: CreateUserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersService.create({
      email: createUserDto.email,
      hashedPassword,
      phone: createUserDto.phone,
      nickname: createUserDto.nickname,
      address: createUserDto.address,
      name: createUserDto.name,
      agreement_use: createUserDto.agreement_use,
      agreement_mkt: createUserDto.agreement_mkt,
      favorites: createUserDto.favorites,
    });
  }

  @Get('find/id')
  @ApiOperation({
    summary: '유저 아이디 찾기',
    description: '유저 아이디 찾기 API',
  })
  @ApiResponse({
    description: '회원가입한 회원정보가 리턴됩니다',
    type: FindUserResponseDto,
  })
  findId(@Body() findUserDto: FindUserDto) {
    return this.usersService.findId({
      name: findUserDto.name,
      phone: findUserDto.phone,
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
