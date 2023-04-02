import { ApiProperty } from '@nestjs/swagger';

export class FindUserPwdDto {
  @ApiProperty({ description: '휴대폰' })
  phone: string;

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '아이디(이메일)' })
  email: string;
}
