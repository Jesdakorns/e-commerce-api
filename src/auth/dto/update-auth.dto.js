"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const register_auth_dto_1 = require("./register-auth.dto");
class UpdateAuthDto extends (0, mapped_types_1.PartialType)(register_auth_dto_1.RegisterFormDto) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-auth.dto.js.map