import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductImage } from '../productImage/entities/productImage.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from 'src/common/utils/multer.options';
import { ScheduleModule } from '@nestjs/schedule';
import { AuctionService } from '../auction/auction.service';
import { Auction } from '../auction/entities/auction.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Auction, Product, ProductImage]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  exports: [ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService, AuctionService, Repository],
})
export class ProductsModule {}
