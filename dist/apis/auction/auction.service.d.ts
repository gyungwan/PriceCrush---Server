import { CreateAuctionDto } from './dto/create-auction.dto';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { Auction } from './entities/auction.entity';
import { ProductsService } from '../products/products.service';
export declare class AuctionService {
    private readonly auctionRepository;
    private readonly productService;
    constructor(auctionRepository: Repository<Auction>, productService: ProductsService);
    create(createAuctionDto: CreateAuctionDto): string;
    findOneAuction({ productId }: {
        productId: any;
    }): Promise<Auction>;
    findMyAuction({ productId, userId }: {
        productId: any;
        userId: any;
    }): Promise<Auction>;
    findAllAuctions({ productId }: {
        productId: any;
    }): Promise<Auction[]>;
    bid(client: Socket, data: {
        product: string;
        user: string;
        price: number;
    }): Promise<void>;
}
