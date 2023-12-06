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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const response_model_1 = require("../response/response-model");
const cache_manager_1 = require("@nestjs/cache-manager");
const typeorm_1 = require("@nestjs/typeorm");
const productOrder_entity_1 = require("./entities/productOrder.entity");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const entities_1 = require("../product/entities");
const product_type_entity_1 = require("../product-type/entities/product-type.entity");
const pagination_1 = require("../utils/pagination");
const product_service_1 = require("../product/product.service");
let OrderService = exports.OrderService = class OrderService {
    constructor(cacheManager, productRepository, productTypeRepository, productOrderRepository, jwtService, entityManager, productService) {
        this.cacheManager = cacheManager;
        this.productRepository = productRepository;
        this.productTypeRepository = productTypeRepository;
        this.productOrderRepository = productOrderRepository;
        this.jwtService = jwtService;
        this.entityManager = entityManager;
        this.productService = productService;
    }
    async getRedisProductIdStock(id) {
        const res = await this.cacheManager.get(`products-${id}-stock`);
        return res ? JSON.parse(res) : undefined;
    }
    async setRedisProductIdStock(id, data) {
        await this.cacheManager.set(`products-${id}-stock`, JSON.stringify(data));
        const res = await this.cacheManager.get(`products-${id}-stock`);
        return JSON.parse(res);
    }
    async deleteRedisProductIdStock(id) {
        await this.cacheManager.del(`products-${id}-stock`);
    }
    async create(token, { productId, amount }) {
        const user = await this.jwtService.decode(token);
        const getRedisProductStock = await this.getRedisProductIdStock(productId);
        let product = getRedisProductStock;
        if (!product) {
            const findProduct = await this.productRepository.findOne({
                select: { id: true, stockQuantity: true },
                where: {
                    id: productId,
                },
            });
            const findProductOrder = await this.productOrderRepository.findOne({
                select: { id: true },
                where: {
                    statusBuy: false,
                    product: { id: findProduct.id },
                    customer: { id: user?.['id'] },
                },
            });
            product = await this.setRedisProductIdStock(productId, {
                stock: findProduct ? findProduct.stockQuantity : 0,
                orderId: findProductOrder ? findProductOrder.id : null,
                hasOrder: !!findProductOrder?.id,
            });
        }
        if (amount > product.stock) {
            throw new common_1.BadRequestException('There is not enough product in stock.');
        }
        if (product.hasOrder) {
            const res = await this.productOrderRepository.update(product.orderId, {
                salesAmount: amount,
                updatedAt: new Date(),
            });
            return new response_model_1.ResponseModel({
                data: res,
            });
        }
        else {
            const res = await this.productOrderRepository.save({
                product: { id: productId },
                customer: user?.['id'],
                salesAmount: amount,
            });
            await this.setRedisProductIdStock(productId, {
                ...product,
                orderId: res ? res.id : null,
                hasOrder: !!res?.id,
            });
            return new response_model_1.ResponseModel({
                data: res,
            });
        }
    }
    async payment(token, { productId }) {
        const user = await this.jwtService.decode(token);
        const res = await this.entityManager.transaction(async (transactionalEntityManager) => {
            const resProductOrder = await transactionalEntityManager
                .createQueryBuilder()
                .select('id,"productId","salesAmount"')
                .from(productOrder_entity_1.ProductOrder, 'po')
                .where({
                id: (0, typeorm_2.In)([...productId]),
                statusBuy: false,
                customer: user?.['id'],
            })
                .execute();
            if (resProductOrder.length === 0) {
                throw new common_1.BadRequestException('No order.');
            }
            await transactionalEntityManager
                .createQueryBuilder()
                .update(entities_1.Products)
                .set({
                stockQuantity: () => `
          (
            select
              (products."stockQuantity") - SUM(po."salesAmount") as "salesAmount"
            from
              "product_order" "po"
            where
              po."productId" = products.id
              and po."customerId" = :userId
              and po."statusBuy" = :statusBuy
            group by
              products.id
          )
          `,
                salesAmount: () => `
          (
            select
              (Products."salesAmount") + SUM(po."salesAmount") as "salesAmount"
            from
              "product_order" "po"
            where
              po."productId" = products.id
              and po."customerId" = :userId
              and po."statusBuy" = :statusBuy
            group by
              products.id
          )
          `,
            })
                .where({
                id: (0, typeorm_2.In)([...resProductOrder.map((val) => val.productId)]),
            })
                .setParameters({
                userId: user?.['id'],
                statusBuy: false,
            })
                .execute();
            const updateProductOrder = await transactionalEntityManager
                .createQueryBuilder()
                .update(productOrder_entity_1.ProductOrder)
                .set({
                statusBuy: true,
                sellAt: new Date(),
            })
                .where({
                id: (0, typeorm_2.In)([...resProductOrder.map((val) => val.id)]),
            })
                .returning('"id","productId","salesAmount"')
                .execute();
            return {
                status: !!updateProductOrder.generatedMaps,
                productIds: [...resProductOrder.map((val) => val.productId)],
            };
        });
        if (res.status) {
            for (const valProductId of res.productIds) {
                this.deleteRedisProductIdStock(valProductId);
            }
        }
        return new response_model_1.ResponseModel({ message: 'Payment successful' });
    }
    async findAll(token, { limit = 10, page = 1, orderBy = 'DESC', orderByField = 'salesAmount', }) {
        const user = await this.jwtService.decode(token);
        const [data, total] = await this.productOrderRepository.findAndCount({
            relations: ['product', 'customer'],
            where: { customer: { id: user?.['id'] }, statusBuy: false },
            take: limit,
            skip: (0, pagination_1.convertSkipPaginate)({ limit, page }),
        });
        return new response_model_1.ResponseModel({
            data,
            paginate: { total, limit, page },
        });
    }
    async findOne(token, id) {
        const user = await this.jwtService.decode(token);
        const data = await this.productOrderRepository.findOne({
            relations: ['product', 'customer'],
            where: { id, statusBuy: false, customer: { id: user?.['id'] } },
        });
        return new response_model_1.ResponseModel({
            data,
        });
        return `This action returns a #${id} order`;
    }
    update(id, updateOrderDto) {
        return `This action updates a #${id} order`;
    }
    remove(id) {
        return `This action removes a #${id} order`;
    }
};
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Products)),
    __param(2, (0, typeorm_1.InjectRepository)(product_type_entity_1.ProductType)),
    __param(3, (0, typeorm_1.InjectRepository)(productOrder_entity_1.ProductOrder)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        typeorm_2.EntityManager,
        product_service_1.ProductService])
], OrderService);
//# sourceMappingURL=order.service.js.map