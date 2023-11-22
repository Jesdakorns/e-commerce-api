"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const local_strategy_1 = require("./strategies/local-strategy");
const jwt_strategy_1 = require("./strategies/jwt-strategy");
const refreshToken_strategy_1 = require("./strategies/refreshToken-strategy");
const user_module_1 = require("../user/user.module");
const user_schema_1 = require("../schema/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../user/entities");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
console.log('process.env.JWT_KEY', process.env.JWT_KEY);
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'user', schema: user_schema_1.UserSchema }]),
            jwt_1.JwtModule.register({
                global: true,
                secret: `${process.env.JWT_KEY}`,
                signOptions: { expiresIn: '7d' },
            }),
            typeorm_1.TypeOrmModule.forFeature([entities_1.Users, entities_1.Passwords]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            user_module_1.UserModule,
            auth_service_1.AuthService,
            user_service_1.UserService,
            jwt_strategy_1.JWTStrategy,
            local_strategy_1.LocalStrategy,
            refreshToken_strategy_1.RefreshTokenStrategy,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map