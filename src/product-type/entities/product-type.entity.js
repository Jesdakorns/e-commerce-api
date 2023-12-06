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
exports.ProductType = void 0;
const entities_1 = require("../../product/entities");
const typeorm_1 = require("typeorm");
let ProductType = exports.ProductType = class ProductType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], ProductType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ProductType.prototype, "titleEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ProductType.prototype, "titleTh", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ProductType.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Products, (product) => product.productType),
    __metadata("design:type", Array)
], ProductType.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], ProductType.prototype, "remove", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], ProductType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], ProductType.prototype, "updatedAt", void 0);
exports.ProductType = ProductType = __decorate([
    (0, typeorm_1.Entity)()
], ProductType);
//# sourceMappingURL=product-type.entity.js.map