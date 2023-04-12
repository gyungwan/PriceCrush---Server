import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuctionService } from './auction.service';
import { UseGuards } from '@nestjs/common';
import { RestAuthAccessGuard } from 'src/common/auth/rest-auth-guards';

// localhost:3000/auction로 요청을 보내면 이 gateway가 작동한다.
@WebSocketGateway({ namespace: 'auction' })
export class AuctionGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly auctionService: AuctionService) {}

  afterInit() {
    console.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, prod_id: string) {
    console.log(`Client ${client.id} join to room ${prod_id}`);
    this.auctionService.joinRoom(client, prod_id);
  }

  @SubscribeMessage('bid')
  handleBid(client: Socket, data: { prod_id: string; price: number }) {
    console.log(`Client ${client.id} bid with ${data[0].price}`);
    console.log(data);
    this.auctionService.bid(client, data[0].prod_id, data[0].price);
  }
}
