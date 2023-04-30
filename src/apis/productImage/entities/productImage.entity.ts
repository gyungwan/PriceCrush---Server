import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '상품이미지 고유 아이디' })
  id: string;

  @Column()
  @ApiProperty({ description: '상품 이미지 주소' })
  url: string;

  @Column()
  @ApiProperty({ description: '상품 메인 이미지 여부' })
  is_main: boolean;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;
}
