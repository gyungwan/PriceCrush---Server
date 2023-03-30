import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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
    const user = await this.userRepository.findOneBy({ name, phone });
    return user.email;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
