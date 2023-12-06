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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const cache_manager_1 = require("@nestjs/cache-manager");
let UserService = exports.UserService = class UserService {
    constructor(cacheManager, entityManager, userRepository, passwordRepository, jwtService) {
        this.cacheManager = cacheManager;
        this.entityManager = entityManager;
        this.userRepository = userRepository;
        this.passwordRepository = passwordRepository;
        this.jwtService = jwtService;
    }
    async getRedisPromotionSub() {
        const redisPromotionSub = await this.cacheManager.get('user');
        return redisPromotionSub;
    }
    async setRedisPromotion(data) {
        await this.cacheManager.set('user', JSON.stringify(data));
    }
    findAll() {
        return '';
    }
    async findOne(token) {
        const user = await this.jwtService.decode(token);
        const resUser = await this.userRepository.findOne({
            where: {
                email: user?.['email'],
            },
        });
        return resUser;
    }
    async findOnWithUsername(username) {
        return '';
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(2, (0, typeorm_2.InjectRepository)(entities_1.Users)),
    __param(3, (0, typeorm_2.InjectRepository)(entities_1.Passwords)),
    __metadata("design:paramtypes", [Object, typeorm_1.EntityManager,
        typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map