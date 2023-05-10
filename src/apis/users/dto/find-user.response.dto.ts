import { ApiProperty } from '@nestjs/swagger';

export class FindUserResponseDto {
  @ApiProperty({ description: 'id' })
  id: string;
  @ApiProperty({ description: '이메일' })
  email: string;
  @ApiProperty({ description: '휴대폰 번호' })
  phone: string;
  @ApiProperty({ description: '닉네임' })
  nickname: string;
  @ApiProperty({ description: '주소' })
  address: string;
  @ApiProperty({ description: '이름' })
  name: string;
  @ApiProperty({ description: '이용약관 동의' })
  agreement_use: boolean;
  @ApiProperty({ description: '마케팅 수신 동의' })
  agreement_mkt: boolean;
  @ApiProperty({ description: '취향들' })
  favorites: string;
}
