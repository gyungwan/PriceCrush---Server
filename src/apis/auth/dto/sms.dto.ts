import { ApiProperty } from '@nestjs/swagger';

export class SmsDto {
  @ApiProperty({ description: '휴대폰 번호' })
  phone: string;
}
