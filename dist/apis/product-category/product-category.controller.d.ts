import { ProductCategoryService } from './product-category.service';
import { ProductCategory } from './entities/product-category.entity';
export declare class ProductCategoryController {
    private readonly productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    createCategory(body: any): Promise<ProductCategory>;
    getCategory(): Promise<ProductCategory[]>;
    updateCategory(id: string, body: any): Promise<{
        id: any;
        name: any;
    } & ProductCategory>;
    removeCategory(id: string): Promise<import("typeorm").DeleteResult>;
}
