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
    const { productCategory, ...product } = createProductInput;
    const result = await this.productRepository.save({
      ...product,
      productCategory: {
        id: productCategory,
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
    if (oldProduct.status !== 0) {
      throw new Error('상품의 상태가 판매 대기중이 아닙니다.');
    }

    const newProduct = {
      ...oldProduct,
      id: productId,
      ...updateProductInput,
    };

    return await this.productRepository.save(newProduct);
  }

  async delete({ id }) {
    await this.productRepository.update(id, { status: -1 });
    const deleteResult = await this.productRepository.softDelete({ id });
    return deleteResult.affected ? true : false;
  }

  async startStatus({ productId }) {
    const oldProduct = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (oldProduct.status !== 0) {
      throw new Error('상품의 상태가 판매 대기중이 아닙니다.');
    }
    const newProduct = {
      ...oldProduct,
      status: 1,
    };
    const result = await this.productRepository.save(newProduct);
    return result;
  }

  async endStatus({ productId }) {
    const oldProduct = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (oldProduct.status !== 1) {
      throw new Error('상품의 상태가 판매중이 아닙니다.');
    }
    const newProduct = {
      ...oldProduct,
      status: 2,
    };
    const result = await this.productRepository.save(newProduct);
    return result;
  }
}
