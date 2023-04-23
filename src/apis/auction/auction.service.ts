import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { AuctionInterface } from './interfaces/auction.interface';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: Repository<Auction>,
    private readonly productService: ProductsService,
  ) {}
  // private readonly auctions: AuctionInterface[] = [
  //   { id: '1', user_id: 'auction1', prod_id: 'prod_1', price: 1000 },
  //   { id: '2', user_id: 'auction2', prod_id: 'prod_2', price: 1000 },
  // ];

  create(createAuctionDto: CreateAuctionDto) {
    return 'This action adds a new auction';
  }
  async findOneAuction({ productId }) {
    return await this.auctionRepository.findOne({
      where: { product: { id: productId } },
      order: { price: 'DESC' },
    });
  }
  async findMyAuction({ productId, userId }) {
    const auction = await this.auctionRepository.findOne({
      where: {
        product: { id: productId },
        user: { id: userId },
      },
    });
    return auction;
  }

  async joinMyAuctionRoom(client: Socket, email: string) {
    const auctions = await this.auctionRepository.find({
      where: {
        user: { email },
      },
    });
    console.log(auctions);
    auctions.forEach((auction) => {
      client.join(`auction-${auction.product.id}`);
      console.log(`Client ${client.id} joined auction-${auction.product.id}`);
    });

    return;
  }

  async findAllAuctions({ productId }): Promise<Auction[]> {
    return await this.auctionRepository.find({ where: { product: productId } });
  }

  // prodRoom이 있고, auctionRoom이 있을 것.
  // prodRoom은 productId가 room의 고유값이 되고, 상품상세페이지에서 입장시에 room에 join, 퇴장시에 room에서 leave
  // auctionRoom은 productId가 room의 고유값이 되고, 입찰시에 room에 join되고, 상품 입찰 종료시에 room에서 leave

  // room을 productId로 하고, socket을 room에 join시키고, bid를 하면 room에 있는 모든 socket에게 broadcast
  async bid(client: Socket, parsedData) {
    // 0. auction을 진행하는 product의 존재여부를 확인함.
    // 1. bid를 하게 될 경우 내역을 DB에 저장함.
    // 2. bid를 하게 될 경우, 현재 입찰가보다 높은지 여부에 따라 입찰에 성공했는지 실패했는지를 socket에게 emit
    // 3. 입찰에 성공할 경우 auction room에 있는 모든 socket에게 broadcast
    // 4. 입찰에 성공할 경우 product room에 있는 모든 socket에게 broadcast
    // 5. 입찰에 성공할 경우 aution database에 저장

    // 들어가야 하는 조건
    // 1. product가 존재해야 함.
    console.log('parsedData:', parsedData);
    const product = await this.productService.find({
      productId: parsedData.product,
    });
    if (!product) {
      console.log(product);
      return;
    }

    // 2. product가 auction이 진행중이어야 함.(now 가 product에서 가져온 start_date과 end_date 사이에 있어야함)
    // let now = new Date();
    // now = new Date(now.setHours(now.getHours() + 9));
    // const isLive = now > product.start_date && now <= product.end_date;
    // if (!isLive) return;

    // 3. auction DB에서 product에 해당하는 auction을 가져옴.
    // const auctions = await this.findAllAuctions({ productId: data.product });
    const auction = await this.findOneAuction({ productId: product.id });
    const myAuction = await this.findMyAuction({
      productId: product.id,
      userId: parsedData.user,
    });
    const currentPrice = auction ? auction.price : product.start_price;

    // 4. 새로운 가격이 기존 가격보다 높은지 확인
    let auctionResult = {};
    console.log(parsedData.price, currentPrice);
    if (parsedData.price > currentPrice) {
      // 5. 이전 경매 내역이 있으면 업데이트, 없으면 신규 값 저장
      if (!myAuction) {
        auctionResult = await this.auctionRepository.save({
          product: { id: parsedData.product },
          user: { id: parsedData.user },
          price: parsedData.price,
        });
        await client.join(`auction-${product.id}`);
      } else {
        Object.assign(myAuction, {
          price: parsedData.price,
          update_dt: new Date(),
        });
        auctionResult = await this.auctionRepository.save(myAuction);
      }
      console.log('client.rooms');
      console.log(client.rooms);
      client
        // .to(`auction-${product.id}`)
        .emit('bidResult', {
          success: true,
          message: `Bid successfully with ${parsedData.price} for ${product.name}`,
          auctionResult,
        });
      // 새로운 입찰이 진행되었을 때, productId room에 있는 모든 socket에게 broadcast
      // 새로운 입찰이 진행되었을 때, auctoinId room에 있는 입찰자에게만 broadcast
    } else {
      client.emit('bidResult', {
        success: false,
        message: `Bid failed with ${parsedData.price} for ${product.name}`,
        auctionResult,
      });
    }
  }
}
