import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '아이디' })
  id: string;

  @ApiProperty({ description: '상품 아이디' })
  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ApiProperty({ description: '유저 아이디' })
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ApiProperty({ description: '입찰가' })
  @Column()
  price: number;

  @ApiProperty({ description: '생성 일자' })
  @CreateDateColumn()
  create_dt: Date;

  @ApiProperty({ description: '업데이트 일자' })
  @UpdateDateColumn()
  update_dt: Date;
}
