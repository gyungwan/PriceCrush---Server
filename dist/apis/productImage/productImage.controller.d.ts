import { ProductImageService } from './productImage.service';
export declare class ProductImageController {
    private readonly productImageService;
    constructor(productImageService: ProductImageService);
    find(productID: string): Promise<import("./entities/productImage.entity").ProductImage[]>;
    create(request: any, response: any): Promise<void>;
}
