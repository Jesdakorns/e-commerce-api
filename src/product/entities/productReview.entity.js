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
exports.ProductReview = void 0;
const entities_1 = require("../../user/entities");
const typeorm_1 = require("typeorm");
const index_1 = require("./index");
let ProductReview = exports.ProductReview = class ProductReview {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], ProductReview.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], ProductReview.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ProductReview.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], ProductReview.prototype, "remove", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], ProductReview.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], ProductReview.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Users, (user) => user.review),
    __metadata("design:type", entities_1.Users)
], ProductReview.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.Products, (product) => product.review),
    __metadata("design:type", index_1.Products)
], ProductReview.prototype, "product", void 0);
exports.ProductReview = ProductReview = __decorate([
    (0, typeorm_1.Entity)()
], ProductReview);
//# sourceMappingURL=productReview.entity.js.map