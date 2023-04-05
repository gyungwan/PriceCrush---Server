"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptionsFactory = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_s3_1 = __importDefault(require("multer-s3"));
const path_1 = __importDefault(require("path"));
const multerOptionsFactory = (ConfigService) => {
    const s3 = new client_s3_1.S3Client({
        region: ConfigService.get('AWS_BUCKET_REGION'),
        credentials: {
            accessKeyId: ConfigService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: ConfigService.get('AWS_SECRET_ACCESS_KEY'),
        },
    });
    return {
        storage: (0, multer_s3_1.default)({
            s3,
            bucket: ConfigService.get('AWS_BUCKET_NAME'),
            key(_req, file, done) {
                const ext = path_1.default.extname(file.originalname);
                const basename = path_1.default.basename(file.originalname, ext);
                done(null, `${basename}_${Date.now()}${ext}`);
            },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
    };
};
exports.multerOptionsFactory = multerOptionsFactory;
//# sourceMappingURL=multer.options.js.map