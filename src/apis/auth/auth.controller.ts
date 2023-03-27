import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CertificationCodeDto } from './dto/certification-code.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
@ApiTags('인증 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: '유저 로그인',
    description: '유저 로그인 API',
  })
  @ApiResponse({
    description: 'access token, refresh token이 리턴됩니다',
    // type: CreateUserResponseDto,
  })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
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
