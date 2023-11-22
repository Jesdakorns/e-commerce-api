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
exports.ProductTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_type_entity_1 = require("./entities/product-type.entity");
const typeorm_2 = require("typeorm");
const response_model_1 = require("../response/response-model");
const cache_manager_1 = require("@nestjs/cache-manager");
const users_entity_1 = require("../user/entities/users.entity");
let ProductTypeService = exports.ProductTypeService = class ProductTypeService {
    constructor(cacheManager, productTypeRepository) {
        this.cacheManager = cacheManager;
        this.productTypeRepository = productTypeRepository;
    }
    async getRedisProductType() {
        const redisProductType = await this.cacheManager.get('productType');
        return redisProductType;
    }
    async setRedisProductType(data) {
        await this.cacheManager.set('productType', JSON.stringify(data));
    }
    async create({ title_en, title_th, image }) {
        const redisProductType = await this.getRedisProductType();
        const res = await this.productTypeRepository.save({
            title_en,
            title_th,
            image,
        });
        if (redisProductType) {
            const productType = JSON.parse(redisProductType);
            productType.push(res);
            await this.setRedisProductType(productType);
        }
        return new response_model_1.ResponseModel({ data: res });
    }
    async findAll() {
        const redisProductType = await this.getRedisProductType();
        if (redisProductType) {
            return new response_model_1.ResponseModel({
                data: JSON.parse(redisProductType),
            });
        }
        else {
            const res = await this.productTypeRepository.find({
                where: {
                    remove: users_entity_1.Remove.FALSE,
                },
                order: {
                    id: 'ASC',
                },
            });
            await this.setRedisProductType(res);
            return new response_model_1.ResponseModel({ data: res });
        }
    }
    async findOne(id) {
        const res = await this.productTypeRepository.findOne({ where: { id } });
        return new response_model_1.ResponseModel({ data: res });
    }
    async update(id, updateProductTypeDto) {
        const redisProductType = await this.getRedisProductType();
        const data = {
            title_en: updateProductTypeDto.title_en,
            title_th: updateProductTypeDto.title_th,
            image: updateProductTypeDto.image,
            updated_at: new Date(),
        };
        const res = await this.productTypeRepository.update(id, data);
        if (redisProductType) {
            const productType = JSON.parse(redisProductType);
            const idx = productType.findIndex((val) => val.id === id);
            productType[idx] = {
                ...productType[idx],
                ...data,
            };
            await this.setRedisProductType(productType);
        }
        return new response_model_1.ResponseModel({ data: res });
    }
    async remove(id) {
        const redisProductType = await this.getRedisProductType();
        const res = await this.productTypeRepository.update(id, {
            remove: users_entity_1.Remove.TRUE,
            updated_at: new Date(),
        });
        if (redisProductType) {
            const productType = JSON.parse(redisProductType);
            const idx = productType.findIndex((val) => val.id === id);
            productType.splice(idx, 1);
            await this.setRedisProductType(productType);
        }
        return new response_model_1.ResponseModel({ data: res });
    }
};
exports.ProductTypeService = ProductTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(1, (0, typeorm_1.InjectRepository)(product_type_entity_1.ProductType)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository])
], ProductTypeService);
//# sourceMappingURL=product-type.service.js.map