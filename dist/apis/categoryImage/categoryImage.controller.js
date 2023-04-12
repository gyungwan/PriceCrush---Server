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
exports.CategoryImageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categoryImage_service_1 = require("./categoryImage.service");
let CategoryImageController = class CategoryImageController {
    constructor(categoryImageService) {
        this.categoryImageService = categoryImageService;
    }
    async find(categoryID) {
        return await this.categoryImageService.find({ categoryID });
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
], CategoryImageController.prototype, "find", null);
CategoryImageController = __decorate([
    (0, common_1.Controller)('categoryImage'),
    (0, swagger_1.ApiTags)('카테고리 이미지 API'),
    __metadata("design:paramtypes", [categoryImage_service_1.CategoryImageService])
], CategoryImageController);
exports.CategoryImageController = CategoryImageController;
//# sourceMappingURL=categoryImage.controller.js.map