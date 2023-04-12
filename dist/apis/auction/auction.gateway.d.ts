import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuctionService } from './auction.service';
export declare class AuctionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly auctionService;
    server: Server;
    constructor(auctionService: AuctionService);
    afterInit(): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, prod_id: string): void;
    handleBid(client: Socket, data: {
        prod_id: string;
        price: number;
    }): void;
}
