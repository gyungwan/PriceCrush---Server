import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/apis/products/entities/product.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '아이디' })
  id: string;

  @OneToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;
}
