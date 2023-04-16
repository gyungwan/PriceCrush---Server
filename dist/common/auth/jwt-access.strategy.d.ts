declare const jwtAccessStrategy_base: new (...args: any[]) => any;
export declare class jwtAccessStrategy extends jwtAccessStrategy_base {
    constructor();
    validate(payload: any): {
        id: any;
        email: any;
    };
}
export {};
