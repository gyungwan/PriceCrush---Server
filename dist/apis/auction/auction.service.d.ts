import { CreateAuctionDto } from './dto/create-auction.dto';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { Auction } from './entities/auction.entity';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';
export declare class AuctionService {
    private readonly auctionRepository;
    private readonly productRepository;
    private readonly productService;
    constructor(auctionRepository: Repository<Auction>, productRepository: Repository<Product>, productService: ProductsService);
    create(createAuctionDto: CreateAuctionDto): string;
    findOneAuction({ productId }: {
        productId: any;
    }): Promise<Auction>;
    findMySellingAuctionList({ userId }: {
        userId: any;
    }): Promise<Auction[]>;
    findMySoldAuctionList({ userId }: {
        userId: any;
    }): Promise<Auction[]>;
    findBiddingList({ userId }: {
        userId: any;
    }): Promise<Auction[]>;
    findEndedBidList({ userId }: {
        userId: any;
    }): Promise<Auction[]>;
    findMyAuction({ productId, userId }: {
        productId: any;
        userId: any;
    }): Promise<Auction>;
    joinMyAuctionRoom(client: Socket, email: string): Promise<void>;
    findAllAuctions({ productId }: {
        productId: any;
    }): Promise<Auction[]>;
    bid(client: Socket, data: any): Promise<void>;
    auctionEnd(auctionId: string): Promise<Auction>;
    auctionDelete(auctionId: string): Promise<boolean>;
    test(client: Socket, data: any): Promise<void>;
}
