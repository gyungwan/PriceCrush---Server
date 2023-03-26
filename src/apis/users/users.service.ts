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

  async create({
    email,
    hashedPassword: password,
    phone,
    nickname,
    address,
    name,
    agreement_use,
    agreement_mkt,
    favorites,
  }) {
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new ConflictException('이미 가입한 email입니다.');
    }
    const newUser = await this.userRepository.save({
      email,
      password,
      phone,
      nickname,
      address,
      name,
      agreement_use,
      agreement_mkt,
      favorites,
    });
    return newUser;
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
