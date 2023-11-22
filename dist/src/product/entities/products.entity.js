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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const product_type_entity_1 = require("../../product-type/entities/product-type.entity");
const entities_1 = require("../../user/entities");
const users_entity_1 = require("../../user/entities/users.entity");
const typeorm_1 = require("typeorm");
let Products = exports.Products = class Products {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Products.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Products.prototype, "stock_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Products.prototype, "sales_amount", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Object)
], Products.prototype, "product_review", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: users_entity_1.Remove, nullable: true, default: users_entity_1.Remove.FALSE }),
    __metadata("design:type", String)
], Products.prototype, "remove", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], Products.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], Products.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_type_entity_1.ProductType, (productType) => productType.id),
    __metadata("design:type", product_type_entity_1.ProductType)
], Products.prototype, "type_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entities_1.Users, (user) => user.id),
    __metadata("design:type", entities_1.Users)
], Products.prototype, "user_id", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)()
], Products);
//# sourceMappingURL=products.entity.js.map