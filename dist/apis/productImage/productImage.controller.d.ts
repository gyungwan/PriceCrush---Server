import { ProductImageService } from './productImage.service';
import { ProductImage } from './entities/productImage.entity';
export declare class ProductImageController {
    private readonly productImageService;
    constructor(productImageService: ProductImageService);
    find(productID: string): Promise<ProductImage[]>;
}
