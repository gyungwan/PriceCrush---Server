declare const jwtRefreshStrategy_base: new (...args: any[]) => any;
export declare class jwtRefreshStrategy extends jwtRefreshStrategy_base {
    constructor();
    validate(payload: any): {
        email: any;
    };
}
export {};
