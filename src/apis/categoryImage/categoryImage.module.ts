import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryImageController } from './categoryImage.controller';
import { CategoryImageService } from './categoryImage.service';
import { CategoryImage } from './entities/categoryImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryImage])],
  controllers: [CategoryImageController],
  providers: [CategoryImageService],
  exports: [CategoryImageService],
})
export class CategoryImageModule {}
