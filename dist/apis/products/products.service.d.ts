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
    startStatus({ productId }: {
        productId: any;
    }): Promise<{
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
    endStatus({ productId }: {
        productId: any;
    }): Promise<{
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
