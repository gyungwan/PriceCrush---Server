import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { IProductsServiceCreate } from './interface/products-service.interface';
import { CreateProductInput } from './dto/create.product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}


  async create({ createProductInput }) {
    //이부분 코드 더 짜야하는데 공부하고 짤게요ㅠ
    const result = await this.productRepository.save({ ...createProductInput });
    return result;
  }

  async findAll() {
    const result = await this.productRepository.find();
    return result;
  }

  async find({ productId }) {
    const result = await this.productRepository.find({
      where: { id: productId },
    });
    return result;
  }

  async update({ productId, updateProductInput }) {
    const oldProduct = await this.productRepository.findOne({
      where: { id: productId },
    });
    const newProduct = {
      ...oldProduct,
      id: productId,
      ...updateProductInput,
    };

    return await this.productRepository.save(newProduct);
  }

  async delete({ id }) {
    const result = await this.productRepository.softDelete({ id });
    return result.affected ? true : false;
  }

}
