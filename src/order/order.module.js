"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_type_entity_1 = require("../product-type/entities/product-type.entity");
const entities_1 = require("../product/entities");
const productOrder_entity_1 = require("./entities/productOrder.entity");
const product_service_1 = require("../product/product.service");
let OrderModule = exports.OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.Products,
                entities_1.ProductReview,
                productOrder_entity_1.ProductOrder,
                product_type_entity_1.ProductType,
            ]),
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, product_service_1.ProductService],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map