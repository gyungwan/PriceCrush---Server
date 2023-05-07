"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const nodemailer = __importStar(require("nodemailer"));
const auction_entity_1 = require("../auction/entities/auction.entity");
const schedule_1 = require("@nestjs/schedule");
let ProductsService = class ProductsService {
    constructor(productRepository, productImageRepository, auctiontRepository, schedulerRegistry) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.auctiontRepository = auctiontRepository;
        this.schedulerRegistry = schedulerRegistry;
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
        const { productCategory } = createProductInput, product = __rest(createProductInput, ["productCategory"]);
        const result = await this.productRepository.save(Object.assign({ productCategory: {
                id: productCategory,
            }, user: {
                id: userId,
            } }, product));
        await Promise.all(imgurl.map((el, i) => this.productImageRepository.save({
            url: el,
            is_main: i === 0 ? true : false,
            product: Object.assign({}, result),
        })));
        return result;
    }
    async search(query) {
        return await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.productCategory', 'productCategory')
            .where('product.name LIKE :query OR product.desc LIKE :query', {
            query: `%${query}%`,
        })
            .orWhere('productCategory.name LIKE :category', {
            category: `%${query}%`,
        })
            .getMany();
    }
    async findAll() {
        const result = await this.productRepository.find({
            relations: ['productCategory', 'productImage'],
        });
        return result;
    }
    async findBeforeEnd() {
        const now = new Date(new Date().getTime() + 1000 * 60 * 60 * 9);
        const result = await this.productRepository.find({
            where: {
                end_date: (0, typeorm_2.MoreThan)(now),
            },
        });
        return result;
    }
    async find({ productId }) {
        const result = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['productCategory', 'productImage'],
        });
        return result;
    }
    async fetchProductsByCategory(categoryId, page, limit) {
        const skip = (page - 1) * limit;
        const take = limit;
        const [products, totalCount] = await this.productRepository.findAndCount({
            where: { productCategory: { id: categoryId } },
            skip,
            take,
        });
        return {
            products,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
        };
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
    async notification({ productId }) {
        const result = await this.auctiontRepository.find({
            where: { product: { id: productId } },
            relations: ['user'],
        });
        const receipts = result.map((el) => el.user.email);
        const prices = result.map((el) => el.price);
        const maxPrice = Math.max(...prices);
        const subject = '경매가 종료되었습니다.';
        const text = `최종 입찰가는 ${maxPrice}원 입니다.`;
        console.log('notification');
        console.log('예약한 job이 실행됩니다');
        receipts.forEach((receipt) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            const message = {
                from: process.env.EMAIL_SENDER,
                to: receipt,
                subject,
                text,
            };
            transporter.sendMail(message);
        });
        console.log(this.schedulerRegistry.getCronJobs());
        this.schedulerRegistry.deleteCronJob(productId);
        console.log(this.schedulerRegistry.getCronJobs());
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(productImage_entity_1.ProductImage)),
    __param(2, (0, typeorm_1.InjectRepository)(auction_entity_1.Auction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        schedule_1.SchedulerRegistry])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map