"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const typeorm_1 = require("@nestjs/typeorm");
const dotenv_1 = require("dotenv");
const product_module_1 = require("./product/product.module");
const product_type_module_1 = require("./product-type/product-type.module");
const cache_manager_1 = require("@nestjs/cache-manager");
(0, dotenv_1.config)({ path: '.env' });
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            cache_manager_1.CacheModule.register({
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
                password: process.env.REDIS_PASS,
                ttl: 10000 * 60 * 60,
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(`${process.env.MONGODB_HOST}`),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: `${process.env.DATABASE_HOST}`,
                port: +process.env.DATABASE_PORT,
                username: `${process.env.DATABASE_USERNAME}`,
                password: `${process.env.DATABASE_PASSWORD}`,
                database: `${process.env.DATABASE_NAME}`,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: ['dist/migrations/*{.ts,.js}'],
                autoLoadEntities: true,
                synchronize: true,
            }),
            product_module_1.ProductModule,
            product_type_module_1.ProductTypeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map