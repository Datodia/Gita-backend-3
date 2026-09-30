"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = loggerMiddleware;
function loggerMiddleware(req, res, next) {
    console.log(`This is logger middleware`);
    next();
}
//# sourceMappingURL=logger.middleware.js.map