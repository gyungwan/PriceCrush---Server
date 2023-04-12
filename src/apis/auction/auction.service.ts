import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { AuctionInterface } from './interfaces/auction.interface';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: Repository<Auction>,
  ) {}
  private readonly auctions: AuctionInterface[] = [
    { id: '1', user_id: 'auction1', prod_id: 'prod_1', price: 1000 },
    { id: '2', user_id: 'auction2', prod_id: 'prod_2', price: 1000 },
  ];

  create(createAuctionDto: CreateAuctionDto) {
    return 'This action adds a new auction';
  }

  findAll(): AuctionInterface[] {
    return this.auctions;
  }

  findOne(id: string): AuctionInterface {
    return this.auctions.find((auction) => auction.id === id);
  }

  // prodRoom이 있고, auctionRoom이 있을 것.
  // prodRoom은 productId가 room의 고유값이 되고, 상품상세페이지에서 입장시에 room에 join, 퇴장시에 room에서 leave
  // auctionRoom은 productId가 room의 고유값이 되고, 입찰시에 room에 join되고, 상품 입찰 종료시에 room에서 leave

  joinRoom(socket: Socket, prod_id: string) {
    socket.join(`product-${prod_id}`);
  }

  // room을 productId로 하고, socket을 room에 join시키고, bid를 하면 room에 있는 모든 socket에게 broadcast
  async bid(socket: Socket, prod_id: string, price: number) {
    // 0. auction을 진행하는 product의 존재여부를 확인함.
    // 1. bid를 하게 될 경우 내역을 DB에 저장함.
    // 2. bid를 하게 될 경우, 현재 입찰가보다 높은지 여부에 따라 입찰에 성공했는지 실패했는지를 socket에게 emit
    // 3. 입찰에 성공할 경우 auction room에 있는 모든 socket에게 broadcast
    // 4. 입찰에 성공할 경우 product room에 있는 모든 socket에게 broadcast
    // 5. 입찰에 성공할 경우 aution database에 저장
    const auction = this.findOne(prod_id);
    console.log(auction);
    // if (!auction) {
    //   return;
    // }

    const currentPrice = 0;
    // const currentPrice = auction.price || 0;
    // currentPrice는 auction database에서 가져온 최종 입찰가

    if (price > currentPrice) {
      auction.price = price;
      socket.emit('bidResult', {
        success: true,
        message: `Bid successfully with ${price} for ${auction.prod_id}`,
        auction,
      });
      socket.broadcast.emit('newBid', auction);
      await this.auctionRepository.save({});
      // 새로운 입찰이 진행되었을 때, productId room에 있는 모든 socket에게 broadcast
      // 새로운 입찰이 진행되었을 때, auctoinId room에 있는 입찰자에게만 broadcast
    } else {
      socket.emit('bidResult', {
        success: false,
        message: `Bid failed with ${price} for ${auction}`,
        auction,
      });
    }
  }
}
