"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasUserEmailInHeaders = void 0;
const common_1 = require("@nestjs/common");
class HasUserEmailInHeaders {
    use(req, res, next) {
        const email = req.headers['email'];
        if (!email || !email.toString().trim() || !email.includes('@')) {
            throw new common_1.BadRequestException('Email is not provided');
        }
        req['email'] = email;
        next();
    }
}
exports.HasUserEmailInHeaders = HasUserEmailInHeaders;
//# sourceMappingURL=has-user-email-in-header.middleware.js.map