import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
export declare class AuctionController {
    private readonly auctionService;
    constructor(auctionService: AuctionService);
    create(createAuctionDto: CreateAuctionDto): string;
    findAll(): string;
    findOne(id: string): string;
}
