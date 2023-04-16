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
const products_service_1 = require("../products/products.service");
let AuctionService = class AuctionService {
    constructor(auctionRepository, productService) {
        this.auctionRepository = auctionRepository;
        this.productService = productService;
    }
    create(createAuctionDto) {
        return 'This action adds a new auction';
    }
    async findOneAuction({ productId }) {
        return await this.auctionRepository.findOne({
            where: { product: { id: productId } },
            order: { price: 'DESC' },
        });
    }
    async findMyAuction({ productId, userId }) {
        const auction = await this.auctionRepository.findOne({
            where: {
                product: { id: productId },
                user: { id: userId },
            },
        });
        return auction;
    }
    async findAllAuctions({ productId }) {
        return await this.auctionRepository.find({ where: { product: productId } });
    }
    async bid(client, data) {
        const product = await this.productService.find({ productId: data.product });
        if (!product)
            return;
        let now = new Date();
        now = new Date(now.setHours(now.getHours() + 9));
        const isLive = now > product.start_date && now <= product.end_date;
        console.log(isLive);
        if (!isLive)
            return;
        const auction = await this.findOneAuction({ productId: product.id });
        const myAuction = await this.findMyAuction({
            productId: product.id,
            userId: data.user,
        });
        console.log('myAuction:', myAuction);
        const currentPrice = auction ? auction.price : product.start_price;
        let auctionResult = {};
        if (data.price > currentPrice) {
            if (!myAuction) {
                auctionResult = await this.auctionRepository.save({
                    product: { id: data.product },
                    user: { id: data.user },
                    price: data.price,
                });
            }
            else {
                Object.assign(myAuction, { price: data.price, update_dt: new Date() });
                console.log(myAuction);
                auctionResult = await this.auctionRepository.save(myAuction);
            }
            await client.join(`auction-${product.id}`);
            client
                .emit('bidResult', {
                success: true,
                message: `Bid successfully with ${data.price} for ${product.name}`,
                auctionResult,
            });
        }
        else {
            client.emit('bidResult', {
                success: false,
                message: `Bid failed with ${data.price} for ${product.name}`,
                auctionResult,
            });
        }
    }
};
AuctionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(auction_entity_1.Auction)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        products_service_1.ProductsService])
], AuctionService);
exports.AuctionService = AuctionService;
//# sourceMappingURL=auction.service.js.map