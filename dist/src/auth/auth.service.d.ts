import { UserService } from './../user/user.service';
import { LoginFormDto, LoginGoogleFormDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EntityManager, Repository } from 'typeorm';
import { RegisterFormDto } from './dto/register-auth.dto';
import { ResponseModel } from 'src/response/response-model';
import { Users } from 'src/user/entities';
export declare class AuthService {
    private readonly entityManager;
    private readonly userService;
    private userRepository;
    private jwtService;
    constructor(entityManager: EntityManager, userService: UserService, userRepository: Repository<Users>, jwtService: JwtService);
    login({ email, password }: LoginFormDto): Promise<ResponseModel<{
        accessToken: string;
        refreshToken: string;
        id: number;
        name: string;
        email: string;
        image: string;
    }>>;
    loginGoogle({ email, name, image }: LoginGoogleFormDto): Promise<ResponseModel<{
        accessToken: string;
        refreshToken: string;
        id: number;
        name: string;
        email: string;
        image: string;
    }>>;
    register({ email, gender, password }: RegisterFormDto): Promise<ResponseModel<import("typeorm").ObjectLiteral>>;
    googleAuth({ id, name, email }: LoginGoogleFormDto): Promise<ResponseModel<{
        accessToken: string;
        refreshToken: string;
        id: string;
        name: string;
        email: string;
    }>>;
    refreshToken(token: string): Promise<ResponseModel<{
        accessToken: string;
    }>>;
    me(token: string): Promise<ResponseModel<Users>>;
    validateUser(email: string, password: string): Promise<Users>;
    hashEmail(email: any): Promise<Users>;
}
