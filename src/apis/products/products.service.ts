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
    const { productCategory, user, ...product } = createProductInput;
    console.log('act');
    const result = await this.productRepository.save({
      ...product,
      productCategory: {
        id: productCategory,
      },
      user: {
        id: user,
      },
    });
    return result;
  }

  async findAll() {
    // const result = await this.productRepository.find({where:{}});
    const result = await this.productRepository.find({
      relations: ['productCategory'],
    });
    return result;
  }

  async find({ productId }) {
    const result = await this.productRepository.find({
      where: { id: productId },
    });
    return result;
  }

  async update({ productId, updateProductInput }) {
    // 상품의 업데이트는 상태값이 0인것만 업데이트 가능하다.(0 === 판매 대기중인 상태)
    const oldProduct = await this.productRepository.findOne({
      where: { id: productId },
    });
    const now = new Date();
    if (oldProduct.start_date > now) {
      throw new Error('아직 경매가 시작되지 않았습니다.');
    }
    const newProduct = {
      ...oldProduct,
      id: productId,
      ...updateProductInput,
    };

    return await this.productRepository.save(newProduct);
  }

  async delete({ id }) {
    const deleteResult = await this.productRepository.softDelete({ id });
    return deleteResult.affected ? true : false;
  }
}
