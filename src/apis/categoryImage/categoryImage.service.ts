import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryImage } from './entities/categoryImage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryImageService {
  constructor(
    @InjectRepository(CategoryImage)
    private readonly categoryImageRepository: Repository<CategoryImage>,
  ) {}

  find({ categoryID }) {
    return this.categoryImageRepository.find({
      where: {
        productCategory: { id: categoryID },
      },
      relations: ['Category'],
    });
  }
}
