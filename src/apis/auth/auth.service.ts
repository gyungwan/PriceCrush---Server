import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import coolsms from 'coolsms-node-sdk';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificationCodeDto } from './dto/certification-code.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  setRefreshService({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    // 이후 보안 설정 추가 필요함.
    res.setHeader('Set-Cookie', `myRefreshKey=${refreshToken}`);
    return;
  }

  getAccesstoken({ user }) {
    const token = this.jwtService.sign(
      { email: user.email }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        name: user.name,
      }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }

  async sendsms(phone: string) {
    // apiKey, apiSecret 설정
    const messageService = new coolsms(
      process.env.COOLSMS_API_KEY,
      process.env.COOLSMS_API_SECRET,
    );

    const randomNum = String(Math.random() * 100000000).substr(1, 6);
    await this.authRepository.save({ phone: phone, code: randomNum });
    // 2건 이상의 메시지를 발송할 때는 sendMany, 단일 건 메시지 발송은 sendOne을 이용해야 합니다.
    messageService
      .sendOne({
        to: `${phone}`,
        from: '01086472391',
        text: `[PriceCrush] 인증번호 : ${randomNum}`,
        type: 'SMS',
        autoTypeDetect: false,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));

    return { status: { code: 200, msg: `${randomNum} 문자발송 완료!` } };
  }

  async certification(certificationCodeDto: CertificationCodeDto) {
    const { phone, code } = certificationCodeDto;
    // 존재 여부
    const validCode = await this.authRepository.findOneBy({ phone, code });
    const now = new Date();

    if (!validCode) {
      throw new ConflictException('인증코드가 일치하지 않습니다.');
    } else {
      const limitTime = validCode.created_at;
      limitTime.setMinutes(limitTime.getMinutes() + 3);
      if (now > limitTime) {
        throw new ConflictException('인증코드의 유효기간이 지났습니다.');
      } else {
        return {
          stauts: {
            code: 200,
            msg: 'success',
          },
        };
      }
    }
  }

  sendemail() {
    return `This action returns all auth`;
  }

  reset() {
    return `This action returns all auth`;
  }
}
