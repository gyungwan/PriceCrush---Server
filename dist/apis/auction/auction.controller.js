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
exports.AuctionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auction_service_1 = require("./auction.service");
const create_auction_dto_1 = require("./dto/create-auction.dto");
const rest_auth_guards_1 = require("../../common/auth/rest-auth-guards");
let AuctionController = class AuctionController {
    constructor(auctionService) {
        this.auctionService = auctionService;
    }
    create(createAuctionDto) {
        return this.auctionService.create(createAuctionDto);
    }
    findAll() {
        return '';
    }
    findUserSellingAuction(req) {
        const userId = req.user.id;
        return this.auctionService.findMySellingAuctionList(userId);
    }
    findUserSoldAuction(req) {
        const userId = req.user.id;
        return this.auctionService.findMySoldAuctionList(userId);
    }
    findBidAuction(req) {
        const userId = req.user.id;
        return this.auctionService.findBiddingList(userId);
    }
    findEndedBidAuction(req) {
        const userId = req.user.id;
        return this.auctionService.findEndedBidList(userId);
    }
    findOne(id) {
        return '';
    }
    async auctionEnd(auctionId) {
        return await this.auctionService.auctionEnd(auctionId);
    }
    async auctionDelete(auctionId) {
        return await this.auctionService.auctionDelete(auctionId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auction_dto_1.CreateAuctionDto]),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(rest_auth_guards_1.RestAuthAccessGuard),
    (0, swagger_1.ApiOperation)({
        summary: '마이페이지 판매 중 경매 리스트',
        description: '마이페이지 판매 중 경매 리스트 조회 API',
    }),
    (0, common_1.Get)('/user/selling'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "findUserSellingAuction", null);
__decorate([
    (0, common_1.UseGuards)(rest_auth_guards_1.RestAuthAccessGuard),
    (0, swagger_1.ApiOperation)({
        summary: '마이페이지 판매 종료 경매 리스트',
        description: '마이페이지 판매 종료 경매 리스트 조회 API',
    }),
    (0, common_1.Get)('/user/sold'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "findUserSoldAuction", null);
__decorate([
    (0, common_1.UseGuards)(rest_auth_guards_1.RestAuthAccessGuard),
    (0, swagger_1.ApiOperation)({
        summary: '마이페이지 입찰 중 경매 리스트',
        description: '마이페이지 입찰 중 경매 리스트 조회 API',
    }),
    (0, common_1.Get)('/user/bidding'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "findBidAuction", null);
__decorate([
    (0, common_1.UseGuards)(rest_auth_guards_1.RestAuthAccessGuard),
    (0, swagger_1.ApiOperation)({
        summary: '마이페이지 종료된 입찰 경매 리스트',
        description: '마이페이지 종료된 입찰 경매 리스트 조회 API',
    }),
    (0, common_1.Get)('/user/endedBid'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "findEndedBidAuction", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '경매 종료', description: '경매 종료 API' }),
    (0, swagger_1.ApiResponse)({ type: Object }),
    __param(0, (0, common_1.Param)('auctionID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "auctionEnd", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '경매 삭제', description: '경매 삭제 API' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)('auctionID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "auctionDelete", null);
AuctionController = __decorate([
    (0, common_1.Controller)('auction'),
    (0, swagger_1.ApiTags)('경매 API'),
    __metadata("design:paramtypes", [auction_service_1.AuctionService])
], AuctionController);
exports.AuctionController = AuctionController;
//# sourceMappingURL=auction.controller.js.map