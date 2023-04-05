import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';
export declare class ProductCategoryService {
    private readonly productCategoryRepository;
    constructor(productCategoryRepository: Repository<ProductCategory>);
    create({ name }: {
        name: any;
    }): Promise<{
        name: any;
    } & ProductCategory>;
    findAll(): Promise<ProductCategory[]>;
    update({ id, name }: {
        id: any;
        name: any;
    }): Promise<{
        id: any;
        name: any;
    } & ProductCategory>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
