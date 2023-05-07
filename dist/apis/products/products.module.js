"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const productImage_entity_1 = require("../productImage/entities/productImage.entity");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const multer_options_1 = require("../../common/utils/multer.options");
const schedule_1 = require("@nestjs/schedule");
const auction_service_1 = require("../auction/auction.service");
const auction_entity_1 = require("../auction/entities/auction.entity");
const typeorm_2 = require("typeorm");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([auction_entity_1.Auction, product_entity_1.Product, productImage_entity_1.ProductImage]),
            platform_express_1.MulterModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: multer_options_1.multerOptionsFactory,
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService, auction_service_1.AuctionService, typeorm_2.Repository],
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map