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
const product_entity_1 = require("../products/entities/product.entity");
let AuctionService = class AuctionService {
    constructor(auctionRepository, productRepository, productService) {
        this.auctionRepository = auctionRepository;
        this.productRepository = productRepository;
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
    async findMySellingAuctionList({ userId }) {
        const myAuctions = await this.auctionRepository.find({
            where: {
                product: {
                    user: { id: userId },
                    end_date: (0, typeorm_1.MoreThan)(new Date(new Date().getTime() + 1000 * 60 * 60 * 9)),
                },
            },
        });
        return myAuctions;
    }
    async findMySoldAuctionList({ userId }) {
        const myAuctions = await this.auctionRepository.find({
            where: {
                product: {
                    user: { id: userId },
                    end_date: (0, typeorm_1.LessThan)(new Date(new Date().getTime() + 1000 * 60 * 60 * 9)),
                },
            },
        });
        return myAuctions;
    }
    async findBiddingList({ userId }) {
        const myAuctions = await this.auctionRepository.find({
            where: {
                user: { id: userId },
                product: {
                    end_date: (0, typeorm_1.LessThan)(new Date(new Date().getTime() + 1000 * 60 * 60 * 9)),
                },
            },
        });
        return myAuctions;
    }
    async findEndedBidList({ userId }) {
        const myAuctions = await this.auctionRepository.find({
            where: {
                user: { id: userId },
                product: {
                    end_date: (0, typeorm_1.LessThan)(new Date(new Date().getTime() + 1000 * 60 * 60 * 9)),
                },
            },
        });
        return myAuctions;
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
    async joinMyAuctionRoom(client, email) {
        const auctions = await this.auctionRepository.find({
            where: {
                user: { email },
                product: {
                    end_date: (0, typeorm_1.MoreThan)(new Date(new Date().getTime() + 1000 * 60 * 60 * 9)),
                },
            },
        });
        console.log(auctions);
        auctions.forEach((auction) => {
            client.join(`auction-${auction.product.id}`);
            console.log(`Client ${client.id} joined auction-${auction.product.id}`);
        });
        return;
    }
    async findAllAuctions({ productId }) {
        return await this.auctionRepository.find({ where: { product: productId } });
    }
    async bid(client, data) {
        const product = await this.productService.find({
            productId: data.product,
        });
        if (!product) {
            console.log(product);
            return;
        }
        let now = new Date();
        now = new Date(now.setHours(now.getHours() + 9));
        const isLive = now > product.start_date && now <= product.end_date;
        if (!isLive)
            return;
        const auction = await this.findOneAuction({ productId: product.id });
        const myAuction = await this.findMyAuction({
            productId: product.id,
            userId: data.user,
        });
        const currentPrice = auction ? auction.price : product.start_price;
        let auctionResult = {};
        console.log(data.price, currentPrice);
        if (data.price > currentPrice) {
            if (!myAuction) {
                auctionResult = await this.auctionRepository.save({
                    product: { id: data.product },
                    user: { id: data.user },
                    price: data.price,
                });
                await client.join(`auction-${product.id}`);
            }
            else {
                Object.assign(myAuction, {
                    price: data.price,
                    update_dt: new Date(),
                });
                Object.assign(product, {
                    start_price: data.price,
                });
                auctionResult = await this.auctionRepository.save(myAuction);
                await this.productRepository.save(product);
            }
            console.log('client.rooms');
            console.log(client.rooms);
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
    async auctionEnd(auctionId) {
        const auction = await this.auctionRepository.findOne({
            where: { id: auctionId },
            relations: ['product'],
        });
        console.log(auction);
        if (!auction) {
            throw new common_1.NotFoundException(`해당하는 경매를 찾을 수 없습니다.`);
        }
        const now = new Date();
        if (auction.product.end_date && auction.product.end_date <= now) {
            throw new Error(`해당 경매가 종료되었습니다.`);
        }
        auction.product.end_date = new Date();
        await this.productRepository.save(auction.product);
        return auction;
    }
    async auctionDelete(auctionId) {
        const auction = await this.auctionRepository.findOne({
            where: { id: auctionId },
            relations: ['product', 'product.user'],
        });
        const productId = auction.product.id;
        const userId = auction.product.user.id;
        await this.auctionRepository.delete(auctionId);
        await this.auctionRepository.manager.delete('Product', productId);
        await this.auctionRepository.manager.delete('User', userId);
        return auction ? true : false;
    }
    async test(client, data) {
        console.log(data);
        client.emit('test', { message: 'test' });
    }
};
AuctionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(auction_entity_1.Auction)),
    __param(1, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        products_service_1.ProductsService])
], AuctionService);
exports.AuctionService = AuctionService;
//# sourceMappingURL=auction.service.js.map