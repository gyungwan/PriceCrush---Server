import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuctionInterface } from './interfaces/auction.interface';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { Auction } from './entities/auction.entity';
export declare class AuctionService {
    private readonly auctionRepository;
    constructor(auctionRepository: Repository<Auction>);
    private readonly auctions;
    create(createAuctionDto: CreateAuctionDto): string;
    findAll(): AuctionInterface[];
    findOne(id: string): AuctionInterface;
    joinRoom(socket: Socket, prod_id: string): void;
    bid(socket: Socket, prod_id: string, price: number): Promise<void>;
}
