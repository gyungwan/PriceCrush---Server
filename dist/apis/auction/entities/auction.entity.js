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
exports.Auction = void 0;
const swagger_1 = require("@nestjs/swagger");
const product_entity_1 = require("../../products/entities/product.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Auction = class Auction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ description: '아이디' }),
    __metadata("design:type", String)
], Auction.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상품 아이디' }),
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", product_entity_1.Product)
], Auction.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '유저 아이디' }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Auction.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입찰가' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Auction.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성 일자' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Auction.prototype, "create_dt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '업데이트 일자' }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Auction.prototype, "update_dt", void 0);
Auction = __decorate([
    (0, typeorm_1.Entity)()
], Auction);
exports.Auction = Auction;
//# sourceMappingURL=auction.entity.js.map