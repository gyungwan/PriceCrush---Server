import { Repository } from 'typeorm';
import { ProductImage } from './entities/productImage.entity';
export declare class ProductImageService {
    private readonly productImageRepository;
    constructor(productImageRepository: Repository<ProductImage>);
    find({ productID }: {
        productID: any;
    }): Promise<ProductImage[]>;
}
