import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import coolsms from 'coolsms-node-sdk';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto) {
    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (user) {
      throw new ConflictException('이미 가입한 email입니다.');
    }
    await this.userRepository.save(createUserDto);

    return {
      status: {
        code: 200,
        message: '회원가입 성공!',
      },
    };
  }

  async findOne({ email }) {
    return await this.userRepository.findOneBy({ email });
  }

  async findId({ name, phone }) {
    const user = await this.userRepository.findOne({
      where: { name, phone },
    });
    return user.email;
  }

  async findUserPWd({ name, phone, email }) {
    const randomNum = String(Math.floor(Math.random() * 1000000)).padStart(
      6,
      '0',
    );
    const user = await this.userRepository.findOne({
      where: { name, phone, email },
    });
    if (!user) {
      throw new UnprocessableEntityException('가입되지 않은 회원입니다.');
    }
    const hashedPassword = await bcrypt.hash(randomNum, 10);

    await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });

    const messageService = new coolsms(
      process.env.COOLSMS_API_KEY,
      process.env.COOLSMS_API_SECRET,
    );

    messageService
      .sendOne({
        to: `${phone}`,
        from: process.env.COOLSMS_PHONE,
        text: `[PriceCrush] 임시비밀번호 : ${randomNum}`,
        type: 'SMS',
        autoTypeDetect: false,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));

    return { status: { code: 200, msg: `${randomNum} 문자발송 완료!` } };
  }

  async updatePwd({ password, email }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.update(
      {
        email,
      },
      { password: hashedPassword },
    );
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
