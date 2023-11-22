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
exports.ProductTypeController = void 0;
const common_1 = require("@nestjs/common");
const product_type_service_1 = require("./product-type.service");
const create_product_type_dto_1 = require("./dto/create-product-type.dto");
const update_product_type_dto_1 = require("./dto/update-product-type.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ProductTypeController = exports.ProductTypeController = class ProductTypeController {
    constructor(productTypeService) {
        this.productTypeService = productTypeService;
    }
    create(req, createProductTypeDto) {
        const token = req?.headers?.authorization?.split('Bearer ')?.[1];
        console.log(`🚀 ~ file: product-type.controller.ts ~ line 25 ~ ProductTypeController ~ create ~ token`, token);
        return this.productTypeService.create(createProductTypeDto);
    }
    findAll(req) {
        const token = req?.headers?.authorization?.split('Bearer ')?.[1];
        console.log(`🚀 ~ file: product-type.controller.ts ~ line 25 ~ ProductTypeController ~ create ~ token`, token);
        return this.productTypeService.findAll();
    }
    findOne(id) {
        return this.productTypeService.findOne(+id);
    }
    update(id, updateProductTypeDto) {
        return this.productTypeService.update(+id, updateProductTypeDto);
    }
    remove(id) {
        return this.productTypeService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_type_dto_1.CreateProductTypeDto]),
    __metadata("design:returntype", void 0)
], ProductTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_type_dto_1.UpdateProductTypeDto]),
    __metadata("design:returntype", void 0)
], ProductTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductTypeController.prototype, "remove", null);
exports.ProductTypeController = ProductTypeController = __decorate([
    (0, common_1.Controller)('productType'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTGuard),
    __metadata("design:paramtypes", [product_type_service_1.ProductTypeService])
], ProductTypeController);
//# sourceMappingURL=product-type.controller.js.map