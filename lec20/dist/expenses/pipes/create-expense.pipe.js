"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExpensePipe = void 0;
const common_1 = require("@nestjs/common");
class CreateExpensePipe {
    transform(value, metadata) {
        const supportedCategories = ['shopping', 'food', 'sport', 'technic', 'travel'];
        if (!value.category || !value.price) {
            throw new common_1.BadRequestException('Category and price is required');
        }
        if (!supportedCategories.includes(value.category)) {
            throw new common_1.BadRequestException('unsupported category provided');
        }
        if (isNaN(value.price) || value.price < 0) {
            throw new common_1.BadRequestException('wrong price provided');
        }
        return {
            price: Number(value.price),
            category: value.category
        };
    }
}
exports.CreateExpensePipe = CreateExpensePipe;
//# sourceMappingURL=create-expense.pipe.js.map