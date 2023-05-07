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
exports.ProductCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_category_entity_1 = require("./entities/product-category.entity");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
let ProductCategoryService = class ProductCategoryService {
    constructor(productCategoryRepository, configService) {
        this.productCategoryRepository = productCategoryRepository;
        this.configService = configService;
    }
    async create({ name }, file) {
        if (!file) {
            throw new common_1.BadRequestException('파일을 업로드 해세요.');
        }
        const imgurl = file.location;
        return await this.productCategoryRepository.save({
            name,
            imgurl,
        });
    }
    async findAll() {
        return await this.productCategoryRepository.find();
    }
    async update({ id, name }) {
        return await this.productCategoryRepository.save({ id: id, name: name });
    }
    async remove(id) {
        const category = await this.productCategoryRepository.findOne({
            where: { id },
        });
        const s3 = new client_s3_1.S3Client({
            region: this.configService.get('AWS_BUCKET_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            },
        });
        try {
            const data = await s3.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.configService.get('AWS_BUCKET_NAME'),
                Key: category.imgurl,
            }));
            console.log(data);
            await this.productCategoryRepository.delete({ id: id });
            return { message: '이미지 삭제 성공' };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException();
        }
    }
};
ProductCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_category_entity_1.ProductCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], ProductCategoryService);
exports.ProductCategoryService = ProductCategoryService;
//# sourceMappingURL=product-category.service.js.map