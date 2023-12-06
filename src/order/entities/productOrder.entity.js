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
exports.ProductOrder = void 0;
const entities_1 = require("../../user/entities");
const typeorm_1 = require("typeorm");
const products_entity_1 = require("../../product/entities/products.entity");
let ProductOrder = exports.ProductOrder = class ProductOrder {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], ProductOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], ProductOrder.prototype, "salesAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], ProductOrder.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.Products, (product) => product.order, { nullable: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", products_entity_1.Products)
], ProductOrder.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Users, (user) => user.productOrder, { nullable: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", entities_1.Users)
], ProductOrder.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], ProductOrder.prototype, "statusBuy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], ProductOrder.prototype, "remove", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], ProductOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], ProductOrder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ProductOrder.prototype, "sellAt", void 0);
exports.ProductOrder = ProductOrder = __decorate([
    (0, typeorm_1.Entity)()
], ProductOrder);
//# sourceMappingURL=productOrder.entity.js.map