import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { FindUserPwdDto } from './dto/find-userPwd.dto';
import { UpdatePwdDto } from './dto/update-userPwd.dto';
import { RestAuthAccessGuard } from 'src/common/auth/rest-auth-guards';

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
    createUserDto.password = hashedPassword;
    return this.usersService.create(createUserDto);
  }

  @UseGuards(RestAuthAccessGuard)
  @Get()
  @ApiOperation({
    summary: '유저 정보 조회',
    description: '유저 정보 조회 API',
  })
  async findOne(@Req() req) {
    const { email } = req.user;
    return this.usersService.myProfile({ email });
  }

  @Get('find/id')
  @ApiOperation({
    summary: '유저 아이디 찾기',
    description: '유저 아이디 찾기 API',
  })
  @ApiResponse({
    description: '찾고자 하는 유저의 아이디가 리턴됩니다.',
    type: String,
  })
  findId(@Query('name') name: string, @Query('phone') phone: string) {
    return this.usersService.findId({
      name,
      phone,
    });
  }

  @Post('reset/pw')
  @ApiOperation({
    summary: '임시 비밀번호 전송 API',
    description: '임시 비밀번호 전송 API',
  })
  @ApiResponse({
    description: '임시비밀번호와 문자발송완료 문구가 리턴됩니다',
    type: String,
  })
  findPwd(@Body() findUserPwdDto: FindUserPwdDto) {
    return this.usersService.findUserPWd({
      name: findUserPwdDto.name,
      phone: findUserPwdDto.phone,
      email: findUserPwdDto.email,
    });
  }

  @UseGuards(RestAuthAccessGuard)
  @Patch('reset/pw')
  @ApiOperation({
    summary: '유저 패스워드 변경',
    description: '유저 비밀번호 변경 API',
  })
  @ApiResponse({
    description:
      '실패시 409 에러 및 변경 실패 메세지, 성공시 비밀번호가 변경되었습니다 메세지가 리턴됩니다',
    type: String,
  })
  updatePwd(@Body() updatePwdDto: UpdatePwdDto, @Req() req) {
    return this.usersService.updatePwd({
      password: updatePwdDto.password,
      email: req.user.email,
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
