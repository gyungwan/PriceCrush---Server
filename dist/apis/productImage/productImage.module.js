"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const productImage_entity_1 = require("./entities/productImage.entity");
const productImage_controller_1 = require("./productImage.controller");
const productImage_service_1 = require("./productImage.service");
const product_entity_1 = require("../products/entities/product.entity");
let ProductImageModule = class ProductImageModule {
};
ProductImageModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([productImage_entity_1.ProductImage, product_entity_1.Product])],
        controllers: [productImage_controller_1.ProductImageController],
        providers: [productImage_service_1.ProductImageService],
        exports: [productImage_service_1.ProductImageService],
    })
], ProductImageModule);
exports.ProductImageModule = ProductImageModule;
//# sourceMappingURL=productImage.module.js.map