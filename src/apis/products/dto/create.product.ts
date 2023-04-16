import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class CreateProductInput {
  @ApiProperty({ description: '상품명' })
  name: string;

  @Min(0)
  @ApiProperty({ description: '상품 경매 시작 가격' })
  start_price: number;

  @ApiProperty({ description: '상품 설명' })
  desc: string;

  @ApiProperty({ description: '경매 시작 일/시' })
  start_date: Date;

  @ApiProperty({ description: '경매 종료 일/시' })
  end_date: Date;

  @ApiProperty({ description: '상품 카테고리 id' })
  productCategory: string;

  // @ApiProperty({ description: '유저 id' })
  // user: string;
}
