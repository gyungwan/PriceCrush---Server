import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from '../productImage/entities/productImage.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create({ createProductInput, files }) {
    if (!files) {
      throw new BadRequestException('파일을 업로드해 주세요.');
    }

    console.log(files);

    const imgurl: string[] = [];

    await Promise.all(
      files.map(async (file: Express.MulterS3.File) => {
        const key = file.location;
        imgurl.push(key);
      }),
    );

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

    await Promise.all(
      imgurl.map((el, i) =>
        this.productImageRepository.save({
          url: el,
          is_main: i === 0 ? true : false,
          product: {
            ...result,
          },
        }),
      ),
    );
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
    const result = await this.productRepository.findOne({
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
