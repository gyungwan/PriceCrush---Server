import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    create({ createProductInput }: {
        createProductInput: any;
    }): Promise<any>;
    findAll(): Promise<Product[]>;
    find({ productId }: {
        productId: any;
    }): Promise<Product[]>;
    update({ productId, updateProductInput }: {
        productId: any;
        updateProductInput: any;
    }): Promise<any>;
    delete({ id }: {
        id: any;
    }): Promise<boolean>;
}
