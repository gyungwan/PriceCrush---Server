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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const productImage_entity_1 = require("../productImage/entities/productImage.entity");
let ProductsService = class ProductsService {
    constructor(productRepository, productImageRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
    }
    async create({ userId, createProductInput, files }) {
        if (!files) {
            throw new common_1.BadRequestException('파일을 업로드해 주세요.');
        }
        const imgurl = [];
        await Promise.all(files.map(async (file) => {
            const key = file.location;
            imgurl.push(key);
        }));
        console.log(imgurl);
        const { productCategory } = createProductInput, product = __rest(createProductInput, ["productCategory"]);
        console.log(product);
        const result = await this.productRepository.save(Object.assign({ productCategory: {
                id: productCategory,
            }, user: {
                id: userId,
            } }, product));
        console.log(result);
        await Promise.all(imgurl.map((el, i) => this.productImageRepository.create({
            url: el,
            is_main: i === 0 ? true : false,
            product: {
                id: result.id,
            },
        })));
        return result;
    }
    async findAll() {
        const result = await this.productRepository.find({
            relations: ['productCategory'],
        });
        return result;
    }
    async find({ productId }) {
        const result = await this.productRepository.findOne({
            where: { id: productId },
        });
        return result;
    }
    async update({ productId, updateProductInput }) {
        const oldProduct = await this.productRepository.findOne({
            where: { id: productId },
        });
        const now = new Date();
        if (oldProduct.start_date > now) {
            throw new Error('아직 경매가 시작되지 않았습니다.');
        }
        const newProduct = Object.assign(Object.assign(Object.assign({}, oldProduct), { id: productId }), updateProductInput);
        return await this.productRepository.save(newProduct);
    }
    async delete({ id }) {
        const deleteResult = await this.productRepository.softDelete({ id });
        return deleteResult.affected ? true : false;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(productImage_entity_1.ProductImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map