/// <reference types="multer-s3" />
import { UpdateProductInput } from './dto/update.product';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { SchedulerRegistry } from '@nestjs/schedule';
export declare class ProductsController {
    private readonly productsService;
    private readonly schedulerRegistry;
    constructor(productsService: ProductsService, schedulerRegistry: SchedulerRegistry);
    createProduct(createproductRequest: string, req: any, files: Express.MulterS3.File): Promise<any>;
    searchProducts(query: string): Promise<Product[]>;
    getProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product>;
    fetchProductsByCategory(categoryId: string, page: number, limit: number): Promise<{
        products: Product[];
        totalCount: number;
        totalPages: number;
    }>;
    updateProduct(id: string, updateProductInput: UpdateProductInput): Promise<any>;
    deleteProduct(id: string): Promise<boolean>;
}
