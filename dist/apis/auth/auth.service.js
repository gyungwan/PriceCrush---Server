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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const coolsms_node_sdk_1 = __importDefault(require("coolsms-node-sdk"));
const auth_entity_1 = require("./entities/auth.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }
    create(createAuthDto) {
        return 'This action adds a new auth';
    }
    setRefreshService({ user, res }) {
        const refreshToken = this.jwtService.sign({ email: user.email }, { secret: 'myRefreshKey', expiresIn: '2w' });
        res.setHeader('Set-Cookie', `myRefreshKey=${refreshToken}`);
        return;
    }
    getAccesstoken({ user }) {
        return this.jwtService.sign({
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            name: user.name,
        }, { secret: 'myAccessKey', expiresIn: '1h' });
    }
    async sendsms(phone) {
        const messageService = new coolsms_node_sdk_1.default(process.env.COOLSMS_API_KEY, process.env.COOLSMS_API_SECRET);
        const randomNum = String(Math.random() * 100000000).substr(1, 6);
        await this.authRepository.save({ phone: phone, code: randomNum });
        return { status: { code: 200, msg: `${randomNum} 문자발송 완료!` } };
    }
    async certification(certificationCodeDto) {
        const { phone, code } = certificationCodeDto;
        const validCode = await this.authRepository.findOneBy({ phone, code });
        const now = new Date();
        if (!validCode) {
            throw new common_1.ConflictException('유효한 인증코드가 존재하지 않습니다');
        }
        else {
            const limitTime = validCode.created_at;
            limitTime.setMinutes(limitTime.getMinutes() + 3);
            if (now > limitTime) {
                throw new common_1.ConflictException('인증코드의 유효기간이 지났습니다');
            }
            else {
                return {
                    stauts: {
                        code: 200,
                        msg: 'success',
                    },
                };
            }
        }
    }
    sendemail() {
        return `This action returns all auth`;
    }
    reset() {
        return `This action returns all auth`;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map