"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseQueryPipe = void 0;
const common_1 = require("@nestjs/common");
class ExpenseQueryPipe {
    transform(value, metadata) {
        const supportedCategories = ['shopping', 'food', 'sport', 'technic', 'travel'];
        if ('category' in value && !supportedCategories.includes(value.category)) {
            throw new common_1.BadRequestException('unknown category provied');
        }
        if ('priceFrom' in value && (isNaN(value.priceFrom) || value.priceFrom < 0)) {
            throw new common_1.BadRequestException('wrong priceFrom provided');
        }
        if ('priceTo' in value && (isNaN(value.priceTo) || value.priceTo < 0)) {
            throw new common_1.BadRequestException('wrong priceTo provided');
        }
        return {
            category: value.category,
            priceFrom: Number(value.priceFrom),
            priceTo: Number(value.priceTo)
        };
    }
}
exports.ExpenseQueryPipe = ExpenseQueryPipe;
//# sourceMappingURL=expense-query.pipe.js.map