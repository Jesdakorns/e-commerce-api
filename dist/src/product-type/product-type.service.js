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
const users_entity_1 = require("../user/entities/users.entity");
let ProductTypeService = exports.ProductTypeService = class ProductTypeService {
    constructor(productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }
    async create({ title_en, title_th, image }) {
        const res = await this.productTypeRepository.save({
            title_en,
            title_th,
            image,
        });
        return new response_model_1.ResponseModel({ data: res });
    }
    async findAll() {
        const res = await this.productTypeRepository.find({
            where: {
                remove: users_entity_1.Remove.FALSE,
            },
            order: {
                id: 'ASC',
            },
        });
        return new response_model_1.ResponseModel({ data: res });
    }
    async findOne(id) {
        const res = await this.productTypeRepository.findOne({ where: { id } });
        return new response_model_1.ResponseModel({ data: res });
    }
    async update(id, updateProductTypeDto) {
        const data = {
            title_en: updateProductTypeDto.title_en,
            title_th: updateProductTypeDto.title_th,
            image: updateProductTypeDto.image,
            updated_at: new Date(),
        };
        const res = await this.productTypeRepository.update(id, data);
        return new response_model_1.ResponseModel({ data: res });
    }
    async remove(id) {
        const res = await this.productTypeRepository.update(id, {
            remove: users_entity_1.Remove.TRUE,
            updated_at: new Date(),
        });
        return new response_model_1.ResponseModel({ data: res });
    }
};
exports.ProductTypeService = ProductTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_type_entity_1.ProductType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductTypeService);
//# sourceMappingURL=product-type.service.js.map