import { CategoryImageService } from './categoryImage.service';
export declare class CategoryImageController {
    private readonly categoryImageService;
    constructor(categoryImageService: CategoryImageService);
    find(categoryID: string): Promise<import("./entities/categoryImage.entity").CategoryImage[]>;
}
