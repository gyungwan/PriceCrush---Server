import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
export declare class AuctionController {
    private readonly auctionService;
    constructor(auctionService: AuctionService);
    create(createAuctionDto: CreateAuctionDto): string;
    findAll(): string;
    findUserSellingAuction(req: any): Promise<import("./entities/auction.entity").Auction[]>;
    findUserSoldAuction(req: any): Promise<import("./entities/auction.entity").Auction[]>;
    findBidAuction(req: any): Promise<import("./entities/auction.entity").Auction[]>;
    findEndedBidAuction(req: any): Promise<import("./entities/auction.entity").Auction[]>;
    findOne(id: string): string;
    auctionEnd(auctionId: string): Promise<import("./entities/auction.entity").Auction>;
    auctionDelete(auctionId: string): Promise<boolean>;
}
