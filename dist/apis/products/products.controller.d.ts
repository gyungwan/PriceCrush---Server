import { CreateProductInput } from './dto/create.product';
import { UpdateProductInput } from './dto/update.product';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductInput: CreateProductInput, files: any): Promise<any>;
    getProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product>;
    updateProduct(id: string, updateProductInput: UpdateProductInput): Promise<any>;
    deleteProduct(id: string): Promise<boolean>;
}
