import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { AuctionGateway } from './auction.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auction]),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [AuctionController],
  providers: [AuctionService, AuctionGateway, ProductsService, Repository],
})
export class AuctionModule {}
