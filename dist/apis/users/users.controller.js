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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const bcrypt = __importStar(require("bcrypt"));
const create_user_dto_1 = require("./dto/create-user.dto");
const find_user_dto_1 = require("./dto/find-user.dto");
const swagger_1 = require("@nestjs/swagger");
const create_user_response_dto_1 = require("./dto/create-user.response.dto");
const find_user_response_dto_1 = require("./dto/find-user.response.dto");
const find_userPwd_dto_1 = require("./dto/find-userPwd.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashedPassword;
        return this.usersService.create(createUserDto);
    }
    findId(findUserDto) {
        return this.usersService.findId({
            name: findUserDto.name,
            phone: findUserDto.phone,
        });
    }
    findPwd(findUserPwdDto) {
        return this.usersService.findUserPWd({
            name: findUserPwdDto.name,
            phone: findUserPwdDto.phone,
            email: findUserPwdDto.email,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '유저 회원가입',
        description: '유저 회원가입 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: '회원가입한 회원정보가 리턴됩니다',
        type: create_user_response_dto_1.CreateUserResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('find/id'),
    (0, swagger_1.ApiOperation)({
        summary: '유저 아이디 찾기',
        description: '유저 아이디 찾기 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: '회원가입한 회원정보가 리턴됩니다',
        type: find_user_response_dto_1.FindUserResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_dto_1.FindUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findId", null);
__decorate([
    (0, common_1.Put)('find/pw'),
    (0, swagger_1.ApiOperation)({
        summary: '유저 패스워드 변경',
        description: '유저 비밀번호 변경 API',
    }),
    (0, swagger_1.ApiResponse)({
        description: '이메일이 전송되었습니다.',
        type: String,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_userPwd_dto_1.FindUserPwdDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findPwd", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('유저 API'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map