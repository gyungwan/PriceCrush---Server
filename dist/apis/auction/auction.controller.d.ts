import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
export declare class AuctionController {
    private readonly auctionService;
    constructor(auctionService: AuctionService);
    create(createAuctionDto: CreateAuctionDto): string;
    findAll(): import("./interfaces/auction.interface").AuctionInterface[];
    findOne(id: string): import("./interfaces/auction.interface").AuctionInterface;
}
