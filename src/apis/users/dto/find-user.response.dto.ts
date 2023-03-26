import { ApiProperty } from '@nestjs/swagger';

export class FindUserResponseDto {
  @ApiProperty({ description: '이메일' })
  email: string;
}
