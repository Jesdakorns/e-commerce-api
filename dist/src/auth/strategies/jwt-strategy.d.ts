import { AuthService } from '../auth.service';
declare const JWTStrategy_base: new (...args: any[]) => any;
export declare class JWTStrategy extends JWTStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: any): Promise<{
        user: any;
        email: any;
    }>;
}
export {};
