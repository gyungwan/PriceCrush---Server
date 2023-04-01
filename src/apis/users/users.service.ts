import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

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

  async findId({ name, phone }) {
    const user = await this.userRepository.findOneBy({ name, phone });
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

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: '[PriceCrush] 임시비밀번호가 발급되었습니다.',
      html: `
      <html>
        <body>
            <div style ="display: flex; flex-direction: column; justify-content: center; width:600px;">
                    <h1>안녕하세요 ${user.name}님, PriceCrush입니다.</h1>
                    <br />
                    <div>${user.name}님의 임시 비밀번호는 다음과 같습니다.</div>
                    <div style = "font-weight: bold;">임시비밀번호: ${randomNum} </div>
                    <br />
                    <div>개인정보 보호를 위해 로그인 후 새로운 비밀번호로 변경해 주시기 바랍니다.</div>
                    <div>저희 PriceCrush를 이용해 주셔서 감사합니다.</div>
                    <br /><br />
                    <buttton style="
                    background-color: #81564B;
                    text-align: center;
                    padding: 20px;
                    text-align: center;
                    cursor: pointer;
                    font-size:24px;
                    width: 200px;
                    padding:20px 60px;
                    outline: none;
                    border: none;
                    border-radius:5px;
                     ;"><a href="비밀번호 변경 페이지 url" style="color: #FFFFFF; text-decoration: none; ">PriceCrush로 이동</a></button>
            </div>
        </body>
    </html>`,
    });

    return '메일이 전송되었습니다.';
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
