import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  sendsms() {
    return `This action returns all auth`;
  }

  certification() {
    return `This action returns all auth`;
  }

  sendemail() {
    return `This action returns all auth`;
  }

  reset() {
    return `This action returns all auth`;
  }
}
