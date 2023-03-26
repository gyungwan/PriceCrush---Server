import { ApiProperty } from '@nestjs/swagger';

export class CreateProductInput {
  @ApiProperty({ description: '상품명' })
  name: string;

  @ApiProperty({ description: '입찰시작가' })
  start_price: number;

  @ApiProperty({ description: '상품설명' })
  desc: string;

  @ApiProperty({ description: '경매 시작 일/시' })
  start_date: Date;

  @ApiProperty({ description: '경매 종료 일/시' })
  end_date: Date;

  @ApiProperty({ description: '상품상태값' })
  status: string;
}
