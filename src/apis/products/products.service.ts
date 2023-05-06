import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, MoreThan, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from '../productImage/entities/productImage.entity';
import * as nodemailer from 'nodemailer';
import { AuctionService } from '../auction/auction.service';
import { Auction } from '../auction/entities/auction.entity';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>, // private readonly auctionService: AuctionService,
    @InjectRepository(Auction)
    private readonly auctiontRepository: Repository<Auction>,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async create({ userId, createProductInput, files }) {
    if (!files) {
      throw new BadRequestException('파일을 업로드해 주세요.');
    }

    const imgurl: string[] = [];

    await Promise.all(
      files.map(async (file: Express.MulterS3.File) => {
        const key = file.location;
        imgurl.push(key);
      }),
    );

    const { productCategory, ...product } = createProductInput;

    const result = await this.productRepository.save({
      productCategory: {
        id: productCategory,
      },
      user: {
        id: userId,
      },
      ...product,
    });

    await Promise.all(
      imgurl.map((el, i) =>
        this.productImageRepository.save({
          url: el,
          is_main: i === 0 ? true : false,
          product: { ...result },
        }),
      ),
    );

    return result;
  }
  async search(query: string) {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productCategory', 'productCategory')
      .where('product.name LIKE :query OR product.desc LIKE :query', {
        query: `%${query}%`,
      })
      .orWhere('productCategory.name LIKE :category', {
        category: `%${query}%`,
      })
      .getMany();
  }

  async findAll() {
    // const result = await this.productRepository.find({where:{}});
    const result = await this.productRepository.find({
      relations: ['productCategory', 'productImage'],
    });
    return result;
  }

  async findBeforeEnd() {
    const now = new Date(new Date().getTime() + 1000 * 60 * 60 * 9);
    const result = await this.productRepository.find({
      where: {
        end_date: MoreThan(now),
      },
    });
    return result;
  }

  async find({ productId }) {
    const result = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productCategory', 'productImage'],
    });
    return result;
  }

  async fetchProductsByCategory(
    categoryId: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
    const take = limit;

    const [products, totalCount] = await this.productRepository.findAndCount({
      where: { productCategory: { id: categoryId } },
      skip,
      take,
    });

    return {
      products,
      totalCount, //총 상품 수
      totalPages: Math.ceil(totalCount / limit), //페이지 수
    };
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

  async notification({ productId }) {
    // 경매 종료시 알림을 보내는 로직
    // 1. aution에 참여한 유저 중 product id에 해당하는 유저들을 가져온다.

    const result = await this.auctiontRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
    });
    const receipts = result.map((el) => el.user.email);
    const prices = result.map((el) => el.price);
    const maxPrice = Math.max(...prices);
    // 2. 메일 내용을 작성함.
    const subject = '경매가 종료되었습니다.';
    const text = `최종 입찰가는 ${maxPrice}원 입니다.`;
    // 3. 해당 유저들에게 이메일로 알림을 보낸다.
    console.log('notification');
    console.log('예약한 job이 실행됩니다');
    receipts.forEach((receipt) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const message = {
        from: process.env.EMAIL_SENDER,
        to: receipt,
        subject,
        text,
      };
      transporter.sendMail(message);
    });
    console.log(this.schedulerRegistry.getCronJobs());
    this.schedulerRegistry.deleteCronJob(productId);
    console.log(this.schedulerRegistry.getCronJobs());
  }
}
