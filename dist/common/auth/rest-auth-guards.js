"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestAuthRefreshGuard = exports.RestAuthAccessGuard = void 0;
const passport_1 = require("@nestjs/passport");
class RestAuthAccessGuard extends (0, passport_1.AuthGuard)('access') {
    getRequest(context) {
        return context.switchToHttp().getRequest();
    }
}
exports.RestAuthAccessGuard = RestAuthAccessGuard;
class RestAuthRefreshGuard extends (0, passport_1.AuthGuard)('refresh') {
    getRequest(context) {
        return context.switchToHttp().getRequest();
    }
}
exports.RestAuthRefreshGuard = RestAuthRefreshGuard;
//# sourceMappingURL=rest-auth-guards.js.map