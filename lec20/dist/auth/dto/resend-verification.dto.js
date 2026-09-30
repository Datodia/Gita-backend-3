"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendVerificationCode = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const verify_user_dto_1 = require("./verify-user.dto");
class ResendVerificationCode extends (0, mapped_types_1.PickType)(verify_user_dto_1.VerifyUserDto, ['email']) {
}
exports.ResendVerificationCode = ResendVerificationCode;
//# sourceMappingURL=resend-verification.dto.js.map