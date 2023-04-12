"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryImageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categoryImage_controller_1 = require("./categoryImage.controller");
const categoryImage_service_1 = require("./categoryImage.service");
const categoryImage_entity_1 = require("./entities/categoryImage.entity");
let CategoryImageModule = class CategoryImageModule {
};
CategoryImageModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([categoryImage_entity_1.CategoryImage])],
        controllers: [categoryImage_controller_1.CategoryImageController],
        providers: [categoryImage_service_1.CategoryImageService],
        exports: [categoryImage_service_1.CategoryImageService],
    })
], CategoryImageModule);
exports.CategoryImageModule = CategoryImageModule;
//# sourceMappingURL=categoryImage.module.js.map