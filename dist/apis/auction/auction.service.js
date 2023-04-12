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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const auction_entity_1 = require("./entities/auction.entity");
let AuctionService = class AuctionService {
    constructor(auctionRepository) {
        this.auctionRepository = auctionRepository;
        this.auctions = [
            { id: '1', user_id: 'auction1', prod_id: 'prod_1', price: 1000 },
            { id: '2', user_id: 'auction2', prod_id: 'prod_2', price: 1000 },
        ];
    }
    create(createAuctionDto) {
        return 'This action adds a new auction';
    }
    findAll() {
        return this.auctions;
    }
    findOne(id) {
        return this.auctions.find((auction) => auction.id === id);
    }
    joinRoom(socket, prod_id) {
        socket.join(`product-${prod_id}`);
    }
    async bid(socket, prod_id, price) {
        const auction = this.findOne(prod_id);
        console.log(auction);
        const currentPrice = 0;
        if (price > currentPrice) {
            auction.price = price;
            socket.emit('bidResult', {
                success: true,
                message: `Bid successfully with ${price} for ${auction.prod_id}`,
                auction,
            });
            socket.broadcast.emit('newBid', auction);
            await this.auctionRepository.save({});
        }
        else {
            socket.emit('bidResult', {
                success: false,
                message: `Bid failed with ${price} for ${auction}`,
                auction,
            });
        }
    }
};
AuctionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(auction_entity_1.Auction)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AuctionService);
exports.AuctionService = AuctionService;
//# sourceMappingURL=auction.service.js.map