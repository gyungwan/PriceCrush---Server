import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuctionService } from './auction.service';
export declare class AuctionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly auctionService;
    server: Server;
    constructor(auctionService: AuctionService);
    afterInit(): void;
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleBid(client: Socket, data: any): Promise<void>;
    handleTest(client: Socket, data: any): Promise<any>;
}
