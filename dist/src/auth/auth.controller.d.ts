import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginFormDto, LoginGoogleFormDto } from './dto/login-auth.dto';
import { RegisterFormDto } from './dto/register-auth.dto';
export declare class AuthController {
    private readonly authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(createAuthDto: LoginFormDto): Promise<import("../response/response-model").ResponseModel<{
        accessToken: string;
        refreshToken: string;
        id: number;
        name: string;
        email: string;
        image: string;
    }>>;
    loginGoogle(createAuthDto: LoginGoogleFormDto): Promise<import("../response/response-model").ResponseModel<{
        accessToken: string;
        refreshToken: string;
        id: number;
        name: string;
        email: string;
        image: string;
    }>>;
    register(registerAuthDto: RegisterFormDto): Promise<import("../response/response-model").ResponseModel<import("typeorm").ObjectLiteral>>;
    refreshToken(req: any): Promise<import("../response/response-model").ResponseModel<{
        accessToken: string;
    }>>;
    user(req: any): Promise<import("../response/response-model").ResponseModel<import("../user/entities").Users>>;
}
