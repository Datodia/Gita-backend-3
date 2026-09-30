"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAgentMiddleware = void 0;
class UserAgentMiddleware {
    use(req, res, next) {
        console.log(req.headers['user-agent']);
        next();
    }
}
exports.UserAgentMiddleware = UserAgentMiddleware;
//# sourceMappingURL=user-agent.middleware.js.map