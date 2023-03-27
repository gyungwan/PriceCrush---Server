import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { IProductsServiceCreate } from './interface/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create({ createProductInput }: IProductsServiceCreate) {
    const { name } = createProductInput; //이부분 코드 더 짜야하는데 공부하고 짤게요ㅠ
    const result = await this.productRepository.save({ name });
    return result;
  }
}
