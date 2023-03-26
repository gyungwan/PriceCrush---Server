import { ApiProperty } from '@nestjs/swagger';

export class CertificationCodeDto {
  @ApiProperty({ description: '발송 번호' })
  phone: string;
  @ApiProperty({ description: '발송 코드' })
  code: string;
}
