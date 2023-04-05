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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const certification_code_dto_1 = require("./dto/certification-code.dto");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = require("@nestjs/passport");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async login(email, password, res) {
        const user = await this.usersService.findOne({ email });
        if (!user) {
            throw new common_1.UnprocessableEntityException('가입한 계정이 없거나 비밀번호가 올바르지 않습니다');
        }
        const isAuth = await bcrypt_1.default.compare(password, user.password);
        if (!isAuth) {
            throw new common_1.UnprocessableEntityException('가입한 계정이 없거나 비밀번호가 올바르지 않습니다');
        }
        this.authService.setRefreshService({ user, res });
        const accessToken = this.authService.getAccesstoken({ user });
        console.log(accessToken);
        return accessToken;
    }
    async restoreAccessToken(req) {
        const { user } = req;
        return this.authService.getAccesstoken({ user });
    }
    sendsms(body) {
        const phone = body.phone;
        console.log('문자가 전송됩니다.');
        return this.authService.sendsms(phone);
    }
    certification(body) {
        return this.authService.certification(body);
    }
    sendemail() {
        return this.authService.sendemail();
    }
    reset() {
        return this.authService.reset();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '유저 로그인',
        description: '유저 로그인 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: 'access token, refresh token이 리턴됩니다',
    }),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('refresh')),
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOperation)({
        summary: '유저 리프레시 토큰 발급',
        description: '리프레시 토큰 발급 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: 'access token, refresh token이 리턴됩니다',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "restoreAccessToken", null);
__decorate([
    (0, common_1.Post)('sms'),
    (0, swagger_1.ApiOperation)({
        summary: '인증번호 발송',
        description: '유저 인증번호발송 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: '발송 성공 여부가 리턴됩니다',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sendsms", null);
__decorate([
    (0, common_1.Post)('certification'),
    (0, swagger_1.ApiOperation)({
        summary: '인증번호 검증',
        description: '유저 인증번호검증 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: '인증 성공 여부가 리턴됩니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [certification_code_dto_1.CertificationCodeDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "certification", null);
__decorate([
    (0, common_1.Post)('password'),
    (0, swagger_1.ApiOperation)({
        summary: '비밀번호 변경 이메일 전송',
        description: '유저 비밀번호 변경 이메일 전송 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: '이메일 발송 성공 여부가 리턴됩니다',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sendemail", null);
__decorate([
    (0, common_1.Put)('password'),
    (0, swagger_1.ApiOperation)({
        summary: '비밀번호 변경 사항 업데이트',
        description: '유저 비밀번호 변경 사항 업데이트 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: '비밀번호 변경 성공 여부가 리턴됩니다.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "reset", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('인증 API'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map