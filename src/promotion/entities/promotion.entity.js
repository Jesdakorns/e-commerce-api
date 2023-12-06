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
exports.PromotionSub = exports.Promotion = exports.ESelect = void 0;
const typeorm_1 = require("typeorm");
var ESelect;
(function (ESelect) {
    ESelect["FALSE"] = "false";
    ESelect["TRUE"] = "true";
})(ESelect || (exports.ESelect = ESelect = {}));
let Promotion = exports.Promotion = class Promotion {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Promotion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Promotion.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Promotion.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], Promotion.prototype, "isSelect", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], Promotion.prototype, "remove", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], Promotion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], Promotion.prototype, "updatedAt", void 0);
exports.Promotion = Promotion = __decorate([
    (0, typeorm_1.Entity)()
], Promotion);
let PromotionSub = exports.PromotionSub = class PromotionSub {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], PromotionSub.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], PromotionSub.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PromotionSub.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], PromotionSub.prototype, "isSelect", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], PromotionSub.prototype, "remove", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], PromotionSub.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], PromotionSub.prototype, "updatedAt", void 0);
exports.PromotionSub = PromotionSub = __decorate([
    (0, typeorm_1.Entity)()
], PromotionSub);
//# sourceMappingURL=promotion.entity.js.map