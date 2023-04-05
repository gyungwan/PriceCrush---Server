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
exports.ProductImageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const productImage_service_1 = require("./productImage.service");
let ProductImageController = class ProductImageController {
    constructor(productImageService) {
        this.productImageService = productImageService;
    }
    async find(productID) {
        return await this.productImageService.find({ productID });
    }
    async create(request, response) {
        console.log('');
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({}),
    (0, swagger_1.ApiResponse)({}),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "find", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '상품 이미지 업로드',
        description: '상품 이미지 업로드 API',
    }),
    (0, swagger_1.ApiBody)({
        required: true,
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                upload: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "create", null);
ProductImageController = __decorate([
    (0, common_1.Controller)('productImage'),
    (0, swagger_1.ApiTags)('상품 이미지 API'),
    __metadata("design:paramtypes", [productImage_service_1.ProductImageService])
], ProductImageController);
exports.ProductImageController = ProductImageController;
//# sourceMappingURL=productImage.controller.js.map