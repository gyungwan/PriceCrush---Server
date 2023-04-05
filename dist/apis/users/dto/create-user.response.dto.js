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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateUserResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일' }),
    __metadata("design:type", String)
], CreateUserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '휴대폰' }),
    __metadata("design:type", String)
], CreateUserResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '닉네임' }),
    __metadata("design:type", String)
], CreateUserResponseDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주소' }),
    __metadata("design:type", String)
], CreateUserResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름' }),
    __metadata("design:type", String)
], CreateUserResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이용약관 동의' }),
    __metadata("design:type", Boolean)
], CreateUserResponseDto.prototype, "agreement_use", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '마케팅 동의' }),
    __metadata("design:type", Boolean)
], CreateUserResponseDto.prototype, "agreement_mkt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '관심사' }),
    __metadata("design:type", Array)
], CreateUserResponseDto.prototype, "favorites", void 0);
exports.CreateUserResponseDto = CreateUserResponseDto;
//# sourceMappingURL=create-user.response.dto.js.map