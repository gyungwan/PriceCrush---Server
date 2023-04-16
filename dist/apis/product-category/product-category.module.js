"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const product_category_service_1 = require("./product-category.service");
const product_category_controller_1 = require("./product-category.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_category_entity_1 = require("./entities/product-category.entity");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const multer_options_1 = require("../../common/utils/multer.options");
let ProductCategoryModule = class ProductCategoryModule {
};
ProductCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_category_entity_1.ProductCategory]),
            platform_express_1.MulterModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: multer_options_1.multerOptionsFactory,
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [product_category_controller_1.ProductCategoryController],
        providers: [product_category_service_1.ProductCategoryService],
    })
], ProductCategoryModule);
exports.ProductCategoryModule = ProductCategoryModule;
//# sourceMappingURL=product-category.module.js.map