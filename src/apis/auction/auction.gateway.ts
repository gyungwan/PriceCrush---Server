import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuctionService } from './auction.service';
import { UseGuards } from '@nestjs/common';
import { RestAuthAccessGuard } from 'src/common/auth/rest-auth-guards';
import { ApiTags } from '@nestjs/swagger';

// localhost:3000/auction로 요청을 보내면 이 gateway가 작동한다.
@WebSocketGateway({
  cors: {
    origin: ['https://price-crush-client.vercel.app', 'http://localhost:3000'],
  },
  namespace: '/auction',
})
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

  async handleConnection(client: Socket, ...args: any[]) {
    const email_obj = client.handshake.headers.cookie;
    if (email_obj) {
      const { email } = JSON.parse(email_obj);
      await this.auctionService.joinMyAuctionRoom(client, email);
    }

    // await this.auctionService.findMyAuctionRoom({ productId });
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('bid')
  async handleBid(
    @ConnectedSocket()
    client: Socket,
    @MessageBody()
    data: { prod_id: string; user_id: string; price: number },
  ) {
    console.log(`Client ${client.id} bid with ${data.price}`);
    console.log('data: ', data[0]);
    await this.auctionService.bid(client, data[0]);
  }
}
