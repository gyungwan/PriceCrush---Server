"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auction_service_1 = require("./auction.service");
const swagger_1 = require("@nestjs/swagger");
let AuctionGateway = class AuctionGateway {
    constructor(auctionService) {
        this.auctionService = auctionService;
    }
    afterInit() {
        console.log('Initialized');
    }
    async handleConnection(client, ...args) {
        const email_obj = client.handshake.headers.cookie;
        if (email_obj) {
            const { email } = JSON.parse(email_obj);
            await this.auctionService.joinMyAuctionRoom(client, email);
        }
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleBid(client, data) {
        console.log(`Client ${client.id} bid with ${data[0].price}`);
        console.log(data[0]);
        this.auctionService.bid(client, data[0]);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AuctionGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('bid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AuctionGateway.prototype, "handleBid", null);
AuctionGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: 'auction' }),
    (0, swagger_1.ApiTags)('WebSockets'),
    __metadata("design:paramtypes", [auction_service_1.AuctionService])
], AuctionGateway);
exports.AuctionGateway = AuctionGateway;
//# sourceMappingURL=auction.gateway.js.map