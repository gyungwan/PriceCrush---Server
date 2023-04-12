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
let ProductsService = class ProductsService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async create({ createProductInput }) {
        const { productCategory, user } = createProductInput, product = __rest(createProductInput, ["productCategory", "user"]);
        console.log('act');
        const result = await this.productRepository.save(Object.assign(Object.assign({}, product), { productCategory: {
                id: productCategory,
            }, user: {
                id: user,
            } }));
        return result;
    }
    async findAll() {
        const result = await this.productRepository.find({
            relations: ['productCategory'],
        });
        return result;
    }
    async find({ productId }) {
        const result = await this.productRepository.find({
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
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map