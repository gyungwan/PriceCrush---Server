import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';
import { Auction } from 'src/apis/auction/entities/auction.entity';
import { ProductCategory } from 'src/apis/product-category/entities/product-category.entity';
import { User } from 'src/apis/users/entities/user.entity';

import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum ProductStatus {
  CANCEL = -1,
  WAITING = 0,
  SELLING = 1,
  SOLD_OUT = 2,
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '상품 고유 id' })
  id: string;

  @Column()
  @ApiProperty({ description: '상품명' })
  name: string;

  @Min(0)
  @Column()
  @ApiProperty({ description: '상품 경매 시작 가격' })
  start_price: number;

  @Column()
  @ApiProperty({ description: '상품 설명' })
  desc: string;

  @Column()
  @ApiProperty({ description: '상품 경매 시작 일/시' })
  start_date: Date;

  @Column()
  @ApiProperty({ description: '상품 경매 종료 일/시' })
  end_date: Date;

  @Column({ default: ProductStatus.WAITING })
  @ApiProperty({ description: '상품상태값' })
  status: ProductStatus;

  @DeleteDateColumn()
  @ApiProperty({ description: '상품 삭제 일/시' })
  deletedAt: Date;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  // 이미지를 어떤식으로 저장할지 ??
  //@OneToMany()

  @OneToOne(() => Auction, (auction) => auction.product)
  auction: Auction;
}
