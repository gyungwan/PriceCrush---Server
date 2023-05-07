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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = __importStar(require("bcrypt"));
const coolsms_node_sdk_1 = __importDefault(require("coolsms-node-sdk"));
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const user = await this.userRepository.findOneBy({
            email: createUserDto.email,
        });
        if (user) {
            throw new common_1.ConflictException('이미 가입한 email입니다.');
        }
        await this.userRepository.save(createUserDto);
        return {
            status: {
                code: 200,
                message: '회원가입 성공!',
            },
        };
    }
    async findOne({ email }) {
        return await this.userRepository.findOneBy({ email });
    }
    async findId({ name, phone }) {
        const user = await this.userRepository.findOne({
            where: { name, phone },
        });
        return user.email;
    }
    async findUserPWd({ name, phone, email }) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const specialCharacters = '!@#$%^&*(),.?":{}|<>';
        const numbers = '0123456789';
        const passwordLength = Math.floor(Math.random() * 13 + 4);
        let temPassword = '';
        while (temPassword.length < passwordLength - 2) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            temPassword += characters.charAt(randomIndex);
        }
        const randomSpecialChar = specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
        const randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
        temPassword += randomSpecialChar;
        temPassword += randomNumber;
        const user = await this.userRepository.findOne({
            where: { name, phone, email },
        });
        if (!user) {
            throw new common_1.UnprocessableEntityException('가입되지 않은 회원입니다.');
        }
        const hashedPassword = await bcrypt.hash(temPassword, 10);
        await this.userRepository.save(Object.assign(Object.assign({}, user), { password: hashedPassword }));
        const messageService = new coolsms_node_sdk_1.default(process.env.COOLSMS_API_KEY, process.env.COOLSMS_API_SECRET);
        messageService
            .sendOne({
            to: `${phone}`,
            from: process.env.COOLSMS_PHONE,
            text: `[PriceCrush] 임시비밀번호 : ${temPassword}`,
            type: 'SMS',
            autoTypeDetect: false,
        })
            .then((res) => {
            return res;
        })
            .catch((err) => console.error(err));
        return { status: { code: 200, msg: `${temPassword} 문자발송 완료!` } };
    }
    async updatePwd({ password, email }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.userRepository.update({
            email,
        }, { password: hashedPassword });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map