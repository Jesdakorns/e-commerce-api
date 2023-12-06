"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOauthGuard = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
class GoogleOauthGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        try {
            const userInfo = await axios_1.default
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${request.body.accessToken}` },
            })
                .then((res) => res.data);
            return userInfo;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
}
exports.GoogleOauthGuard = GoogleOauthGuard;
//# sourceMappingURL=google-oauth.guard.js.map