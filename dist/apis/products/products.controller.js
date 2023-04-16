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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_product_1 = require("./dto/create.product");
const update_product_1 = require("./dto/update.product");
const products_service_1 = require("./products.service");
const product_entity_1 = require("./entities/product.entity");
const platform_express_1 = require("@nestjs/platform-express");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async createProduct(createProductInput, files) {
        return await this.productsService.create({ createProductInput, files });
    }
    async getProducts() {
        return await this.productsService.findAll();
    }
    async getProduct(id) {
        return await this.productsService.find({ productId: id });
    }
    async updateProduct(id, updateProductInput) {
        return await this.productsService.update({
            productId: id,
            updateProductInput,
        });
    }
    async deleteProduct(id) {
        return await this.productsService.delete({ id });
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', 10)),
    (0, swagger_1.ApiOperation)({
        summary: '상품 생성',
        description: '상품 생성 API',
    }),
    (0, swagger_1.ApiResponse)({
        type: product_entity_1.Product,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_1.CreateProductInput, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({
        summary: '상품 전체 조회',
        description: '상품 전체 조회 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: '상품 리스트가 리턴됩니다',
        type: [product_entity_1.Product],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '상품 상세 조회',
        description: '상품 상세 조회 API',
    }),
    (0, swagger_1.ApiResponse)({ type: product_entity_1.Product }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '상품 업데이트',
        description: '상품 업데이트 API',
    }),
    (0, swagger_1.ApiResponse)({ type: product_entity_1.Product }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_1.UpdateProductInput]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: '상품 삭제', description: '상품 삭제 API' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
ProductsController = __decorate([
    (0, common_1.Controller)('product'),
    (0, swagger_1.ApiTags)('상품 API'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map