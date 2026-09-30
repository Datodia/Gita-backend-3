"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalfRejectMiddleware = void 0;
const common_1 = require("@nestjs/common");
class HalfRejectMiddleware {
    use(req, res, next) {
        if (Math.random() > 0.5) {
            throw new common_1.BadRequestException('Rejected');
        }
        next();
    }
}
exports.HalfRejectMiddleware = HalfRejectMiddleware;
//# sourceMappingURL=half-reject.middleware.js.map