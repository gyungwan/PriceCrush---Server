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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = __importStar(require("bcrypt"));
const nodemailer = __importStar(require("nodemailer"));
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
        const user = await this.userRepository.findOneBy({ name, phone });
        return user.email;
    }
    async findUserPWd({ name, phone, email }) {
        const randomNum = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
        const user = await this.userRepository.findOne({
            where: { name, phone, email },
        });
        if (!user) {
            throw new common_1.UnprocessableEntityException('가입되지 않은 회원입니다.');
        }
        const hashedPassword = await bcrypt.hash(randomNum, 10);
        await this.userRepository.save(Object.assign(Object.assign({}, user), { password: hashedPassword }));
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL_SENDER,
            to: email,
            subject: '[PriceCrush] 임시비밀번호가 발급되었습니다.',
            html: `
      <html>
        <body>
            <div style ="display: flex; flex-direction: column; justify-content: center; width:600px;">
                    <h1>안녕하세요 ${user.name}님, PriceCrush입니다.</h1>
                    <br />
                    <div>${user.name}님의 임시 비밀번호는 다음과 같습니다.</div>
                    <div style = "font-weight: bold;">임시비밀번호: ${randomNum} </div>
                    <br />
                    <div>개인정보 보호를 위해 로그인 후 새로운 비밀번호로 변경해 주시기 바랍니다.</div>
                    <div>저희 PriceCrush를 이용해 주셔서 감사합니다.</div>
                    <br /><br />
                    <buttton style="
                    background-color: #81564B;
                    text-align: center;
                    padding: 20px;
                    text-align: center;
                    cursor: pointer;
                    font-size:24px;
                    width: 200px;
                    padding:20px 60px;
                    outline: none;
                    border: none;
                    border-radius:5px;
                     ;"><a href="비밀번호 변경 페이지 url" style="color: #FFFFFF; text-decoration: none; ">PriceCrush로 이동</a></button>
            </div>
        </body>
    </html>`,
        });
        return '메일이 전송되었습니다.';
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map