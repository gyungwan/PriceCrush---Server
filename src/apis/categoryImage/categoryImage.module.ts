import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryImageController } from './categoryImage.controller';
import { CategoryImageService } from './categoryImage.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [CategoryImageController],
  providers: [CategoryImageService],
  exports: [CategoryImageService],
})
export class CategoryImageModule {}
