import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from '../productImage/entities/productImage.entity';
import { Auction } from '../auction/entities/auction.entity';
import { SchedulerRegistry } from '@nestjs/schedule';
export declare class ProductsService {
    private readonly productRepository;
    private readonly productImageRepository;
    private readonly auctiontRepository;
    private readonly schedulerRegistry;
    constructor(productRepository: Repository<Product>, productImageRepository: Repository<ProductImage>, auctiontRepository: Repository<Auction>, schedulerRegistry: SchedulerRegistry);
    create({ userId, createProductInput, files }: {
        userId: any;
        createProductInput: any;
        files: any;
    }): Promise<any>;
    search(query: string): Promise<Product[]>;
    findAll(): Promise<Product[]>;
    findBeforeEnd(): Promise<Product[]>;
    find({ productId }: {
        productId: any;
    }): Promise<Product>;
    fetchProductsByCategory(categoryId: string, page: number, limit: number): Promise<{
        products: Product[];
        totalCount: number;
        totalPages: number;
    }>;
    update({ productId, updateProductInput }: {
        productId: any;
        updateProductInput: any;
    }): Promise<any>;
    delete({ id }: {
        id: any;
    }): Promise<boolean>;
    notification({ productId }: {
        productId: any;
    }): Promise<void>;
}
