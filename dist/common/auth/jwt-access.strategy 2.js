"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAccessStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class jwtAccessStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'access') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'myAcesskey',
        });
    }
    validate(payload) {
        console.log(payload);
        return {
            email: payload.email,
        };
    }
}
exports.jwtAccessStrategy = jwtAccessStrategy;
//# sourceMappingURL=jwt-access.strategy.js.map