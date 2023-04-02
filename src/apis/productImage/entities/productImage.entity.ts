import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  url: string;

  @Column()
  is_main: boolean;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;
}
