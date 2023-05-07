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
const rest_auth_guards_1 = require("../../common/auth/rest-auth-guards");
const platform_express_1 = require("@nestjs/platform-express");
const schedule_1 = require("@nestjs/schedule");
const cron_1 = require("cron");
let ProductsController = class ProductsController {
    constructor(productsService, schedulerRegistry) {
        this.productsService = productsService;
        this.schedulerRegistry = schedulerRegistry;
    }
    async createProduct(createproductRequest, req, files) {
        const createProductInput = JSON.parse(createproductRequest);
        const userId = req.user.id;
        const product = await this.productsService.create({
            userId,
            createProductInput,
            files,
        });
        console.log(product.end_date);
        const endDate = new Date(product.end_date);
        const notiDate = new Date(endDate.getTime() - 1000 * 60 * 60 * 9);
        console.log(new Date());
        const endMonth = notiDate.getMonth();
        const endDay = notiDate.getDate();
        const endHour = notiDate.getHours();
        const endMinute = notiDate.getMinutes();
        const endSecond = notiDate.getSeconds();
        const endTime = `${endSecond} ${endMinute} ${endHour} ${endDay} ${endMonth} *`;
        console.log(endTime);
        const job = new cron_1.CronJob(endTime, () => {
            console.log('end_date가 되어 경매를 종료합니다.');
            this.productsService.notification({ productId: product.id });
        });
        this.schedulerRegistry.addCronJob(product.id, job);
        job.start();
        return product;
    }
    async searchProducts(query) {
        return await this.productsService.search(query);
    }
    async getProducts() {
        return await this.productsService.findAll();
    }
    async getProduct(id) {
        return await this.productsService.find({ productId: id });
    }
    async fetchProductsByCategory(categoryId, page, limit) {
        const products = await this.productsService.fetchProductsByCategory(categoryId, (page = 1), (limit = 12));
        return products;
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
    (0, common_1.UseGuards)(rest_auth_guards_1.RestAuthAccessGuard),
    (0, common_1.Post)('/'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    (0, swagger_1.ApiOperation)({
        summary: '상품 생성',
        description: '상품 생성 API',
    }),
    (0, swagger_1.ApiBody)({
        description: 'form-data로 넘겨주세요. accessToken을 함께 넘겨줘야합니다. createProductInput에 상품 정보를 넣고, 이미지를 따로 넘겨주세요. postman예시는 카톡으로 드리겠습니다. ',
        type: create_product_1.CreateProductInput,
    }),
    (0, swagger_1.ApiResponse)({
        type: product_entity_1.Product,
    }),
    __param(0, (0, common_1.Body)('createproductRequest')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('/search/'),
    (0, swagger_1.ApiOperation)({
        summary: '상품 검색',
        description: '상품 검색 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: '상품 리스트가 리턴됩니다',
        type: [product_entity_1.Product],
    }),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "searchProducts", null);
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
    (0, common_1.Get)('/category/:categoryId'),
    (0, swagger_1.ApiOperation)({
        summary: '카테고리별 상품 조회',
        description: '특정 카테고리의 상품을 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ type: [product_entity_1.Product] }),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "fetchProductsByCategory", null);
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
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        schedule_1.SchedulerRegistry])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map