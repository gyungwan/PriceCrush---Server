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
exports.Product = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const auction_entity_1 = require("../../auction/entities/auction.entity");
const product_category_entity_1 = require("../../product-category/entities/product-category.entity");
const productImage_entity_1 = require("../../productImage/entities/productImage.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ description: '상품 고유 id' }),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '상품명' }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Min)(0),
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '상품 경매 시작 가격' }),
    __metadata("design:type", Number)
], Product.prototype, "start_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '상품 설명' }),
    __metadata("design:type", String)
], Product.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '상품 경매 시작 일/시' }),
    __metadata("design:type", Date)
], Product.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '상품 경매 종료 일/시' }),
    __metadata("design:type", Date)
], Product.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)({ description: '상품 삭제 일/시' }),
    __metadata("design:type", Date)
], Product.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_category_entity_1.ProductCategory),
    __metadata("design:type", product_category_entity_1.ProductCategory)
], Product.prototype, "productCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Product.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => productImage_entity_1.ProductImage, (productImage) => productImage.product, {
        cascade: true,
    }),
    __metadata("design:type", productImage_entity_1.ProductImage)
], Product.prototype, "productImage", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => auction_entity_1.Auction, (auction) => auction.product),
    __metadata("design:type", auction_entity_1.Auction)
], Product.prototype, "auction", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map