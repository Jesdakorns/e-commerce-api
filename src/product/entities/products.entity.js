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
const typeorm_1 = require("typeorm");
const productOrder_entity_1 = require("../../order/entities/productOrder.entity");
const productReview_entity_1 = require("./productReview.entity");
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
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true }),
    __metadata("design:type", Array)
], Products.prototype, "coverPhoto", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Products.prototype, "stockQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Products.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Products.prototype, "priceMinusDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Products.prototype, "salesAmount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_type_entity_1.ProductType, (productType) => productType.product, {
        nullable: false,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", product_type_entity_1.ProductType)
], Products.prototype, "productType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Users, (user) => user.product, {
        nullable: false,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", entities_1.Users)
], Products.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => productReview_entity_1.ProductReview, (pr) => pr.product),
    __metadata("design:type", Array)
], Products.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => productOrder_entity_1.ProductOrder, (po) => po.product),
    __metadata("design:type", Array)
], Products.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], Products.prototype, "remove", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], Products.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], Products.prototype, "updatedAt", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)()
], Products);
//# sourceMappingURL=products.entity.js.map