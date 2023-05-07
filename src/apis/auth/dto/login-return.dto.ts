import { ApiProperty } from '@nestjs/swagger';

export class LoginReturnDto {
  @ApiProperty({ description: 'access token' })
  accessToken: string;
  @ApiProperty({
    description: '유저 정보(email, phone, nickname, address, name)',
  })
  user: {
    id: string;
    email: string;
    phone: string;
    nickname: string;
    address: string;
    name: string;
  };
}
