/// <reference types="multer-s3" />
import { UpdateProductInput } from './dto/update.product';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createproductRequest: string, req: any, files: Express.MulterS3.File): Promise<any>;
    getProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product>;
    updateProduct(id: string, updateProductInput: UpdateProductInput): Promise<any>;
    deleteProduct(id: string): Promise<boolean>;
}
