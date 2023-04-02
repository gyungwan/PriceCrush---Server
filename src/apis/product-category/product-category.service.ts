import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create({ name }) {
    return await this.productCategoryRepository.save({ name });
  }

  async findAll() {
    return await this.productCategoryRepository.find();
  }

  async update({ id, name }) {
    return await this.productCategoryRepository.save({ id: id, name: name });
  }

  async remove(id: string) {
    return await this.productCategoryRepository.delete({ id: id });
  }
}
