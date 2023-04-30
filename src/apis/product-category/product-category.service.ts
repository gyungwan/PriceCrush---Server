import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
    private readonly configService: ConfigService,
  ) {}

  async create({ name }, file: Express.MulterS3.File) {
    if (!file) {
      throw new BadRequestException('파일을 업로드 해세요.');
    }
    const imgurl = file.location;
    return await this.productCategoryRepository.save({
      name,
      imgurl,
    });
  }

  async findAll() {
    return await this.productCategoryRepository.find();
  }

  async update({ id, name }) {
    return await this.productCategoryRepository.save({ id: id, name: name });
  }

  async remove(id: string) {
    const category = await this.productCategoryRepository.findOne({
      where: { id },
    });

    const s3 = new S3Client({
      region: this.configService.get('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    try {
      // S3 스토리지에서 파일 삭제
      const data = await s3.send(
        new DeleteObjectCommand({
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Key: category.imgurl,
        }),
      );
      console.log(data);
      await this.productCategoryRepository.delete({ id: id });
      return { message: '이미지 삭제 성공' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
