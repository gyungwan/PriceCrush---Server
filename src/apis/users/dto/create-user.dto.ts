import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;

  @ApiProperty({ description: '휴대폰' })
  phone: string;

  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @ApiProperty({ description: '주소' })
  address: string;

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '이용약관 동의' })
  agreement_use: boolean;

  @ApiProperty({ description: '마케팅 동의' })
  agreement_mkt: boolean;

  @ApiProperty({ description: '관심사' })
  favorites: [];
}
