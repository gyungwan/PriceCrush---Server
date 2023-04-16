import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from '../productImage/entities/productImage.entity';
export declare class ProductsService {
    private readonly productRepository;
    private readonly productImageRepository;
    constructor(productRepository: Repository<Product>, productImageRepository: Repository<ProductImage>);
    create({ userId, createProductInput, files }: {
        userId: any;
        createProductInput: any;
        files: any;
    }): Promise<any>;
    findAll(): Promise<Product[]>;
    find({ productId }: {
        productId: any;
    }): Promise<Product>;
    update({ productId, updateProductInput }: {
        productId: any;
        updateProductInput: any;
    }): Promise<any>;
    delete({ id }: {
        id: any;
    }): Promise<boolean>;
}
