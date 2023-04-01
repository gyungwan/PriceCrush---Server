import {
  Controller,
  Post,
  Put,
  Body,
  UnprocessableEntityException,
  Response,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CertificationCodeDto } from './dto/certification-code.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { jwtRefreshStrategy } from 'src/common/auth/jwt-refresh.strategy';
import { jwtAccessStrategy } from 'src/common/auth/jwt-access.strategy';

@Controller('auth')
@ApiTags('인증 API')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '유저 로그인',
    description: '유저 로그인 API',
  })
  @ApiResponse({
    description: 'access token, refresh token이 리턴됩니다',
    // type: CreateUserResponseDto,
  })
  async login(
    @Body('email') email: string, //
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.usersService.findOne({ email });
    if (!user) {
      throw new UnprocessableEntityException(
        '가입한 계정이 없거나 비밀번호가 올바르지 않습니다',
      );
    }
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException(
        '가입한 계정이 없거나 비밀번호가 올바르지 않습니다',
      );
    }
    this.authService.setRefreshService({ user, res });
    const accessToken = this.authService.getAccesstoken({ user });
    console.log(accessToken);
    return accessToken;
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('refresh')
  @ApiOperation({
    summary: '유저 리프레시 토큰 발급',
    description: '리프레시 토큰 발급 API',
  })
  @ApiResponse({
    description: 'access token, refresh token이 리턴됩니다',
    // type: CreateUserResponseDto,
  })
  async restoreAccessToken(@Req() req) {
    // current user를 어떻게 알 수 있지?
    const { user } = req;
    return this.authService.getAccesstoken({ user });
  }

  @Post('sms')
  @ApiOperation({
    summary: '인증번호 발송',
    description: '유저 인증번호발송 API',
  })
  @ApiResponse({
    description: '발송 성공 여부가 리턴됩니다',
    // type: CreateUserResponseDto,
  })
  sendsms(@Body() body) {
    const phone = body.phone;
    console.log('문자가 전송됩니다.');
    return this.authService.sendsms(phone);
  }

  @Post('certification')
  @ApiOperation({
    summary: '인증번호 검증',
    description: '유저 인증번호검증 API',
  })
  @ApiResponse({
    description: '인증 성공 여부가 리턴됩니다.',
    // type: CreateUserResponseDto,
  })
  certification(@Body() body: CertificationCodeDto) {
    return this.authService.certification(body);
  }

  @Post('password')
  @ApiOperation({
    summary: '비밀번호 변경 이메일 전송',
    description: '유저 비밀번호 변경 이메일 전송 API',
  })
  @ApiResponse({
    description: '이메일 발송 성공 여부가 리턴됩니다',
    // type: CreateUserResponseDto,
  })
  sendemail() {
    return this.authService.sendemail();
  }

  @Put('password')
  @ApiOperation({
    summary: '비밀번호 변경 사항 업데이트',
    description: '유저 비밀번호 변경 사항 업데이트 API',
  })
  @ApiResponse({
    description: '비밀번호 변경 성공 여부가 리턴됩니다.',
    // type: CreateUserResponseDto,
  })
  reset() {
    return this.authService.reset();
  }
}
