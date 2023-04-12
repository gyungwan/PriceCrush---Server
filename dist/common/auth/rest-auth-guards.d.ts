import { ExecutionContext } from '@nestjs/common';
declare const RestAuthAccessGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RestAuthAccessGuard extends RestAuthAccessGuard_base {
    getRequest(context: ExecutionContext): any;
}
declare const RestAuthRefreshGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RestAuthRefreshGuard extends RestAuthRefreshGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
