import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto {
  @ApiProperty({ description: '휴대폰' })
  phone: string;

  @ApiProperty({ description: '이름' })
  name: string;
}
