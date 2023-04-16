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
exports.ProductCategoryController = void 0;
const common_1 = require("@nestjs/common");
const product_category_service_1 = require("./product-category.service");
const swagger_1 = require("@nestjs/swagger");
const product_category_entity_1 = require("./entities/product-category.entity");
const platform_express_1 = require("@nestjs/platform-express");
let ProductCategoryController = class ProductCategoryController {
    constructor(productCategoryService) {
        this.productCategoryService = productCategoryService;
    }
    async createCategory(body, file) {
        const JsonBady = JSON.parse(body);
        const name = JsonBady.name;
        if (name === undefined)
            throw new common_1.UnauthorizedException('카테고리 이름을 입력해주세요');
        return await this.productCategoryService.create({ name }, file);
    }
    getCategory() {
        return this.productCategoryService.findAll();
    }
    updateCategory(id, body) {
        const name = body.name;
        return this.productCategoryService.update({ id, name });
    }
    async removeCategory(id) {
        return this.productCategoryService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({
        summary: '상품 카테고리 생성',
        description: '상품 카테고리 생성 API',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: '상품 카테고리 생성',
        type: product_category_entity_1.ProductCategory,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                name: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Body)('body')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '상품 카테고리 전체 조회',
        description: '상품 카테고리 전체 조회 API',
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: '상품 카테고리', type: product_category_entity_1.ProductCategory }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductCategoryController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '상품 카테고리 수정',
        description: '상품 카테고리 수정 API',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: '상품 카테고리 수정',
        type: product_category_entity_1.ProductCategory,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                name: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductCategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '상품 카테고리 삭제',
        description: '상품 카테고리 삭제 API',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '삭제완료' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "removeCategory", null);
ProductCategoryController = __decorate([
    (0, common_1.Controller)('product-category'),
    (0, swagger_1.ApiTags)('상품 카테고리 API'),
    __metadata("design:paramtypes", [product_category_service_1.ProductCategoryService])
], ProductCategoryController);
exports.ProductCategoryController = ProductCategoryController;
//# sourceMappingURL=product-category.controller.js.map