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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const typeorm_2 = require("typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const response_model_1 = require("../response/response-model");
const dayjs = require("dayjs");
const jwt_1 = require("@nestjs/jwt");
const product_type_entity_1 = require("../product-type/entities/product-type.entity");
const pagination_1 = require("../utils/pagination");
const productOrder_entity_1 = require("../order/entities/productOrder.entity");
let ProductService = exports.ProductService = class ProductService {
    constructor(cacheManager, productRepository, productTypeRepository, productOrderRepository, jwtService, entityManager) {
        this.cacheManager = cacheManager;
        this.productRepository = productRepository;
        this.productTypeRepository = productTypeRepository;
        this.productOrderRepository = productOrderRepository;
        this.jwtService = jwtService;
        this.entityManager = entityManager;
    }
    async getRedisProduct() {
        const redisProduct = await this.cacheManager.get('products');
        return redisProduct ? JSON.parse(redisProduct) : null;
    }
    async setRedisProduct(data) {
        await this.cacheManager.set('products', JSON.stringify(data));
    }
    async create(token, { title, description, price, coverPhoto, stockQuantity, productType, discount, }) {
        const user = await this.jwtService.decode(token);
        const newProductType = await this.productTypeRepository.create({
            id: productType,
        });
        const newProduct = this.productRepository.create({
            title,
            description,
            price,
            coverPhoto,
            stockQuantity,
            user: user?.['id'],
            productType: newProductType,
            discount,
            priceMinusDiscount: price - (discount ?? 0),
        });
        const data = await this.productRepository.save(newProduct);
        return new response_model_1.ResponseModel({ data });
    }
    async findAll({ limit = 10, page = 1, order = 'DESC', orderByField = 'salesAmount', search, highPrice, lowPrice, }) {
        console.log(`🚀 ~ file: product.service.ts ~ line 94 ~ ProductService ~ lowPrice`, lowPrice);
        console.log(`🚀 ~ file: product.service.ts ~ line 94 ~ ProductService ~ order`, order);
        const qb = await this.productRepository
            .createQueryBuilder('p')
            .select([
            'p.id as id',
            'p.title as title',
            'p.price as price',
            'p.discount as discount',
            `p.price - p.discount as "priceMinusDiscount"`,
            'p.stockQuantity as "stockQuantity"',
            'p.salesAmount as "salesAmount"',
            'p.coverPhoto as "coverPhoto"',
            `json_build_object(
          'id', pt.id,
          'titleTh',pt."titleTh",
          'titleEn',pt."titleEn"
        ) as productType`,
        ])
            .leftJoin('p.productType', 'pt');
        console.log('qb', qb.getQuery());
        if (search) {
            await qb.where(`(p.title LIKE :search or pt."titleTh" LIKE :search or pt."titleEn" LIKE :search)`, { search: `%${search}%` });
        }
        if (highPrice && lowPrice) {
            await qb.andWhere('"priceMinusDiscount" BETWEEN :lowPrice AND :highPrice', { lowPrice: +lowPrice, highPrice: +highPrice });
        }
        if (orderByField === 'priceMinusDiscount') {
            await qb.orderBy('"priceMinusDiscount"', order || 'DESC');
        }
        else {
            await qb.orderBy(`p.${orderByField}`, order || 'DESC');
        }
        await qb.offset((0, pagination_1.convertSkipPaginate)({ limit, page }));
        await qb.limit(limit);
        const data = await qb.getRawMany();
        const total = await qb.getCount();
        return new response_model_1.ResponseModel({ data, paginate: { total, page, limit } });
    }
    async findTopSell({ limit = 10, page = 1 }) {
        const today = dayjs();
        const monday = today.startOf('week').add(1, 'day');
        const sunday = today.endOf('week').add(1, 'day');
        const [data, total] = await this.productRepository.findAndCount({
            relations: ['order'],
            where: {
                order: {
                    sellAt: (0, typeorm_2.Between)(new Date(monday.toISOString()), new Date(sunday.toISOString())),
                },
            },
            take: limit,
            skip: (0, pagination_1.convertSkipPaginate)({ limit, page }),
            order: { salesAmount: 'DESC' },
        });
        return new response_model_1.ResponseModel({
            data,
            paginate: {
                total,
                limit,
                page,
            },
        });
    }
    async findOne(id) {
        const res = await this.productRepository.find({
            select: {
                productType: { id: true, titleEn: true, titleTh: true },
                user: { id: true, name: true, image: true },
            },
            relations: {
                productType: true,
                user: true,
            },
            where: {
                id,
            },
        });
        return new response_model_1.ResponseModel({
            data: res,
        });
    }
    async update(id, updateProductDto) {
        const res = await this.productRepository.update(id, {
            ...updateProductDto,
            productType: updateProductDto.productType,
            updatedAt: new Date(),
        });
        return new response_model_1.ResponseModel({
            data: res,
        });
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Products)),
    __param(2, (0, typeorm_1.InjectRepository)(product_type_entity_1.ProductType)),
    __param(3, (0, typeorm_1.InjectRepository)(productOrder_entity_1.ProductOrder)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        typeorm_2.EntityManager])
], ProductService);
//# sourceMappingURL=product.service.js.map