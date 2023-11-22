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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_service_1 = require("./../user/user.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const response_model_1 = require("../response/response-model");
const entities_1 = require("../user/entities");
const users_entity_1 = require("../user/entities/users.entity");
let AuthService = exports.AuthService = class AuthService {
    constructor(entityManager, userService, userRepository, jwtService) {
        this.entityManager = entityManager;
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async login({ email, password }) {
        const user = await this.validateUser(email, password);
        console.log(`🚀 ~ file: auth.service.ts ~ line 28 ~ AuthService ~ login ~ user`, user);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
        };
        return new response_model_1.ResponseModel({
            data: {
                ...payload,
                accessToken: await this.jwtService.sign(payload),
                refreshToken: await this.jwtService.sign(payload, { expiresIn: '14d' }),
            },
        });
    }
    async loginGoogle({ email, name, image }) {
        console.log(`🚀 ~ file: auth.service.ts ~ line 46 ~ AuthService ~ loginGoogle ~ { email, name, image }`, { email, name, image });
        const user = await this.userRepository.findOneBy({ email });
        console.log(`🚀 ~ file: auth.service.ts ~ line 51 ~ AuthService ~ loginGoogle ~ user`, user);
        const payload = {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            image: user?.image,
        };
        if (!user) {
            const userSave = await this.userRepository.save({
                email,
                name,
                image,
                provider: users_entity_1.Provider.GOOGLE,
                created_at: new Date(),
                updated_at: new Date(),
            });
            console.log(`🚀 ~ file: auth.service.ts ~ line 57 ~ AuthService ~ loginGoogle ~ userSave`, userSave);
            payload.id = userSave.id;
            payload.name = userSave.name;
            payload.image = userSave.image;
            payload.email = userSave.email;
        }
        return new response_model_1.ResponseModel({
            data: {
                ...payload,
                accessToken: await this.jwtService.sign(payload),
                refreshToken: await this.jwtService.sign(payload, {
                    expiresIn: '14d',
                }),
            },
        });
    }
    async register({ email, gender, password }) {
        const hashEmail = await this.hashEmail(email);
        if (hashEmail) {
            throw new common_1.BadRequestException('Email is already in use.');
        }
        const hashPassword = bcrypt.hashSync(password, Number(10));
        const resUser = await this.entityManager.transaction(async (transactionalEntityManager) => {
            const resPassword = await transactionalEntityManager
                .createQueryBuilder()
                .insert()
                .into(entities_1.Passwords)
                .values({
                password: hashPassword,
            })
                .execute();
            const res = await transactionalEntityManager
                .createQueryBuilder()
                .insert()
                .into(entities_1.Users)
                .values({
                email,
                gender,
                created_at: new Date(),
                updated_at: new Date(),
                password: resPassword?.raw?.[0]?.id,
            })
                .returning(['email', 'gender', 'created_at', 'updated_at'])
                .execute();
            return res?.generatedMaps?.[0];
        });
        return new response_model_1.ResponseModel({ data: resUser });
    }
    async googleAuth({ id, name, email }) {
        console.log({ id, name, email });
        const payload = { id: id, name: name, email: email };
        return new response_model_1.ResponseModel({
            data: {
                ...payload,
                accessToken: await this.jwtService.sign(payload),
                refreshToken: await this.jwtService.sign(payload, { expiresIn: '14d' }),
            },
        });
    }
    async refreshToken(token) {
        const user = await this.jwtService.decode(token);
        const payload = { sub: user?.['id'], email: user?.['email'] };
        return new response_model_1.ResponseModel({
            data: {
                accessToken: await this.jwtService.sign(payload),
            },
        });
    }
    async me(token) {
        const user = await this.jwtService.decode(token);
        const resUser = await this.userRepository.findOne({
            where: {
                email: user?.['email'],
            },
        });
        if (!resUser) {
            throw new common_1.UnauthorizedException();
        }
        return new response_model_1.ResponseModel({ data: resUser });
    }
    async validateUser(email, password) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.password', 'password')
            .where({
            email,
        })
            .getOne();
        const isPassword = await bcrypt.compare(password, user?.password?.password || '');
        if (!isPassword) {
            return null;
        }
        return user;
    }
    async hashEmail(email) {
        const hashEmail = await this.userRepository.findOne({
            where: {
                email,
            },
        });
        return hashEmail;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        user_service_1.UserService,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map