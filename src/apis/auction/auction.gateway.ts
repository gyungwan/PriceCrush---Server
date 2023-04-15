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
import { ApiTags } from '@nestjs/swagger';

// localhost:3000/auction로 요청을 보내면 이 gateway가 작동한다.
@WebSocketGateway({ namespace: 'auction' })
@ApiTags('WebSockets')
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

  @SubscribeMessage('join-page')
  handleJoinPageRoom(client: Socket, data: { prod_id: string }) {
    console.log(data);
    console.log(`Client ${client.id} join to room ${data[0].prod_id}`);
    this.auctionService.joinPageRoom(client, data[0].prod_id);
  }

  @SubscribeMessage('bid')
  handleBid(
    client: Socket,
    data: { prod_id: string; user_id: string; price: number },
  ) {
    console.log(`Client ${client.id} bid with ${data[0].price}`);
    console.log(data[0]);
    this.auctionService.bid(client, data[0]);
  }
}
