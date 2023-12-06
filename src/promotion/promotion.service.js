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
exports.PromotionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const promotion_entity_1 = require("./entities/promotion.entity");
const typeorm_2 = require("typeorm");
const response_model_1 = require("../response/response-model");
const upload_service_1 = require("../upload/upload.service");
let PromotionService = exports.PromotionService = class PromotionService {
    constructor(uploadService, cacheManager, promotionRepository, promotionSubRepository) {
        this.uploadService = uploadService;
        this.cacheManager = cacheManager;
        this.promotionRepository = promotionRepository;
        this.promotionSubRepository = promotionSubRepository;
    }
    async getRedisPromotion() {
        const redisPromotion = await this.cacheManager.get('promotion');
        return redisPromotion;
    }
    async getRedisPromotionSub() {
        const redisPromotionSub = await this.cacheManager.get('promotionSub');
        return redisPromotionSub;
    }
    async setRedisPromotion(data) {
        await this.cacheManager.set('promotion', JSON.stringify(data));
    }
    async setRedisPromotionSub(data) {
        await this.cacheManager.set('promotionSub', JSON.stringify(data));
    }
    async create({ promotions, query }) {
        const redisPromotion = await this.getRedisPromotion();
        const redisPromotionSub = await this.getRedisPromotionSub();
        const res = await Promise.all(promotions.map(async ({ url, image }) => {
            const data = query?.type === 'sub'
                ? await this.promotionSubRepository.save({
                    url,
                    image,
                    isSelect: true,
                })
                : await this.promotionRepository.save({
                    url,
                    image,
                    isSelect: true,
                });
            return data;
        }));
        if (query?.type === 'sub' && redisPromotionSub) {
            await this.setRedisPromotionSub([
                ...JSON.parse(redisPromotionSub),
                ...res,
            ]);
        }
        if (query?.type !== 'sub' && redisPromotion) {
            await this.setRedisPromotion([...JSON.parse(redisPromotion), ...res]);
        }
        return new response_model_1.ResponseModel({
            data: res,
        });
    }
    async findAll() {
        const data = {
            promotion: [],
            promotionSub: [],
        };
        const redisPromotion = await this.getRedisPromotion();
        const redisPromotionSub = await this.getRedisPromotionSub();
        if (redisPromotionSub) {
            data.promotionSub = JSON.parse(redisPromotionSub);
        }
        else {
            const resSub = await this.promotionSubRepository.find({
                where: { isSelect: true },
                order: {
                    id: 'ASC',
                },
                take: 2,
            });
            await this.setRedisPromotionSub(resSub);
            data.promotionSub = resSub;
        }
        if (redisPromotion) {
            data.promotion = JSON.parse(redisPromotion);
        }
        else {
            const res = await this.promotionRepository.find({
                where: { isSelect: true },
                order: {
                    id: 'ASC',
                },
                take: 10,
            });
            await this.setRedisPromotion(res);
            data.promotion = res;
        }
        return new response_model_1.ResponseModel({
            data,
        });
    }
    findOne(id) {
        return `This action returns a #${id} promotion`;
    }
    async update(id, { url, image, selectItem, mode }) {
        const redisPromotion = await this.getRedisPromotion();
        const redisPromotionSub = await this.getRedisPromotionSub();
        const data = {
            url,
            image,
            isSelect: /true/.test(selectItem) ? true : false,
            updatedAt: new Date(),
        };
        let res;
        if (mode === 'sub') {
            res = await this.promotionSubRepository.update(id, data);
            if (redisPromotionSub) {
                await this.cacheManager.del('promotionSub');
            }
        }
        else {
            res = await this.promotionRepository.update(id, data);
            if (redisPromotion) {
                await this.cacheManager.del('promotion');
            }
        }
        return new response_model_1.ResponseModel({ data: res });
    }
    remove(id) {
        return `This action removes a #${id} promotion`;
    }
};
exports.PromotionService = PromotionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(2, (0, typeorm_1.InjectRepository)(promotion_entity_1.Promotion)),
    __param(3, (0, typeorm_1.InjectRepository)(promotion_entity_1.PromotionSub)),
    __metadata("design:paramtypes", [upload_service_1.UploadService, Object, typeorm_2.Repository,
        typeorm_2.Repository])
], PromotionService);
//# sourceMappingURL=promotion.service.js.map