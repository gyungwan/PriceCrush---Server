/// <reference types="multer-s3" />
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { ConfigService } from '@nestjs/config';
export declare class ProductCategoryService {
    private readonly productCategoryRepository;
    private readonly configService;
    constructor(productCategoryRepository: Repository<ProductCategory>, configService: ConfigService);
    create({ name }: {
        name: any;
    }, file: Express.MulterS3.File): Promise<{
        name: any;
        imgurl: string;
    } & ProductCategory>;
    findAll(): Promise<ProductCategory[]>;
    update({ id, name }: {
        id: any;
        name: any;
    }): Promise<{
        id: any;
        name: any;
    } & ProductCategory>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
