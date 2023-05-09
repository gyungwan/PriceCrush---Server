import { ApiProperty } from '@nestjs/swagger';

export class UpdatePwdDto {
  @ApiProperty({ description: '바꿀 새로운 비밀번호' })
  password: string;
}
