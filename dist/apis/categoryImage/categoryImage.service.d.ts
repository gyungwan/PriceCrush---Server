import { CategoryImage } from './entities/categoryImage.entity';
import { Repository } from 'typeorm';
export declare class CategoryImageService {
    private readonly categoryImageRepository;
    constructor(categoryImageRepository: Repository<CategoryImage>);
    find({ categoryID }: {
        categoryID: any;
    }): Promise<CategoryImage[]>;
}
