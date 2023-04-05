import { CreateProductInput } from './dto/create.product';
import { UpdateProductInput } from './dto/update.product';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductInput: CreateProductInput): Promise<any>;
    getProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product[]>;
    updateProduct(id: string, updateProductInput: UpdateProductInput): Promise<any>;
    deleteProduct(id: string): Promise<boolean>;
    updateStart(id: string): Promise<{
        status: number;
        id: string;
        name: string;
        start_price: number;
        desc: string;
        start_date: Date;
        end_date: Date;
        deletedAt: Date;
        productCategory: import("../product-category/entities/product-category.entity").ProductCategory;
        user: import("../users/entities/user.entity").User;
    } & Product>;
    updateEnd(id: string): Promise<{
        status: number;
        id: string;
        name: string;
        start_price: number;
        desc: string;
        start_date: Date;
        end_date: Date;
        deletedAt: Date;
        productCategory: import("../product-category/entities/product-category.entity").ProductCategory;
        user: import("../users/entities/user.entity").User;
    } & Product>;
}
