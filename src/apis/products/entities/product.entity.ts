import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';
import { Auction } from 'src/apis/auction/entities/auction.entity';
import { ProductCategory } from 'src/apis/product-category/entities/product-category.entity';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
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

  @Column()
  @ApiProperty({ description: '최소 입찰 단위' })
  minBidPrice: string;

  @DeleteDateColumn()
  @ApiProperty({ description: '상품 삭제 일/시' })
  deletedAt: Date;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
  })
  productImage: ProductImage[];

  @OneToOne(() => Auction, (auction) => auction.product)
  auction: Auction;
}
