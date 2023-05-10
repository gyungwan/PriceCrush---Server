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
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RestAuthRefreshGuard } from 'src/common/auth/rest-auth-guards';
import { SmsDto } from './dto/sms.dto';
import { LoginReturnDto } from './dto/login-return.dto';

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
    type: LoginReturnDto,
    // type: CreateUserResponseDto,
  })
  async login(
    @Body() loginDto: LoginDto, //
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginReturnDto> {
    const user = await this.usersService.findOne({ email: loginDto.email });
    if (!user) {
      throw new UnprocessableEntityException(
        '가입한 계정이 없거나 비밀번호가 올바르지 않습니다',
      );
    }
    const isAuth = await bcrypt.compare(loginDto.password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException(
        '가입한 계정이 없거나 비밀번호가 올바르지 않습니다',
      );
    }
    this.authService.setRefreshService({ user, res });
    const accessToken = this.authService.getAccesstoken({ user });
    console.log(accessToken);
    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        nickname: user.nickname,
        address: user.address,
        name: user.name,
      },
    };
  }

  // @UseGuards(RestAuthRefreshGuard)
  @Post('refresh')
  @ApiOperation({
    summary: 'access token 발급',
    description: 'access token 발급 API',
  })
  @ApiResponse({
    description: 'access token이 리턴됩니다',
    // type: CreateUserResponseDto,
  })
  async restoreAccessToken(@Req() req) {
    // current user를 어떻게 알 수 있지?
    const { user } = req;
    console.log(user);
    return this.authService.getAccesstoken({ user });
  }

  @Post('sms')
  @ApiOperation({
    summary: '인증번호 발송',
    description: '유저 인증번호발송 API',
  })
  @ApiResponse({
    description: '발송 성공 여부가 리턴됩니다',
    //type: CreateUserResponseDto,
  })
  sendsms(@Body() smsDto: SmsDto) {
    const phone = smsDto.phone;
    console.log('문자가 전송됩니다.');
    return this.authService.sendsms(phone);
  }

  @Post('sms/certification')
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

  // @Post('password')
  // @ApiOperation({
  //   summary: '비밀번호 변경 이메일 전송',
  //   description: '유저 비밀번호 변경 이메일 전송 API',
  // })
  // @ApiResponse({
  //   description: '이메일 발송 성공 여부가 리턴됩니다',
  //   // type: CreateUserResponseDto,
  // })
  // sendemail() {
  //   return this.authService.sendemail();
  // }

  // @Put('password')
  // @ApiOperation({
  //   summary: '비밀번호 변경 사항 업데이트',
  //   description: '유저 비밀번호 변경 사항 업데이트 API',
  // })
  // @ApiResponse({
  //   description: '비밀번호 변경 성공 여부가 리턴됩니다.',
  //   // type: CreateUserResponseDto,
  // })
  // reset() {
  //   return this.authService.reset();
  // }
}
