import { ProductCategory } from 'src/apis/product-category/entities/product-category.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  url: string;

  @OneToOne(() => ProductCategory)
  productCategory: ProductCategory;
}
