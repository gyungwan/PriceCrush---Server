import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from 'src/apis/product-category/entities/product-category.entity';
import { User } from 'src/apis/users/entities/user.entity';

import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
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
  @ApiProperty({ description: '상품상태값' })
  status: string;

  @DeleteDateColumn()
  @ApiProperty({ description: '상품 삭제 일/시' })
  deletedAt: Date;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;
}
