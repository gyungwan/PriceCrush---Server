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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fileupload_service_1 = require("./fileupload.service");
const swagger_1 = require("@nestjs/swagger");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    uploadFile(file) {
        return this.fileService.uploadFile(file);
    }
    async uploadFiles(files) {
        const imgurl = [];
        await Promise.all(files.map(async (file) => {
            const key = await this.fileService.uploadFiles(file);
            imgurl.push(key);
        }));
        return {
            statusCode: 201,
            message: '이미지 등록 성공',
            data: imgurl,
        };
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiOperation)({
        summary: '파일 업로드',
        description: '파일 업로드 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: '이미지 url이 리턴됩니다',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('uploads'),
    (0, swagger_1.ApiOperation)({
        summary: '파일 업로드',
        description: '파일 업로드 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: '이미지 url이 리턴됩니다',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFiles", null);
FileController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [fileupload_service_1.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=fileupload.controller.js.map