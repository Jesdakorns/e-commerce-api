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
exports.Users = exports.Provider = exports.Remove = exports.Gender = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const _1 = require(".");
const productOrder_entity_1 = require("../../order/entities/productOrder.entity");
const entities_1 = require("../../product/entities");
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (exports.Gender = Gender = {}));
var Remove;
(function (Remove) {
    Remove["FALSE"] = "false";
    Remove["TRUE"] = "true";
})(Remove || (exports.Remove = Remove = {}));
var Provider;
(function (Provider) {
    Provider["GOOGLE"] = "google";
    Provider["DEFAULT"] = "default";
})(Provider || (exports.Provider = Provider = {}));
let Users = exports.Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Users.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Gender, nullable: true, default: null }),
    __metadata("design:type", String)
], Users.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        nullable: true,
        enum: Provider,
        default: Provider.DEFAULT,
    }),
    __metadata("design:type", String)
], Users.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _1.Passwords, (password) => password.userId, { cascade: true }),
    __metadata("design:type", _1.Passwords)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => productOrder_entity_1.ProductOrder, (order) => order.customer),
    __metadata("design:type", Array)
], Users.prototype, "productOrder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.ProductReview, (review) => review.user),
    __metadata("design:type", Array)
], Users.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Products, (product) => product.user),
    __metadata("design:type", Array)
], Users.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], Users.prototype, "remove", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
//# sourceMappingURL=users.entity.js.map