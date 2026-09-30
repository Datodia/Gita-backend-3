"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const isAuth_guard_1 = require("../guards/isAuth.guard");
const user_decorator_1 = require("../users/decorators/user.decorator");
const throttler_1 = require("@nestjs/throttler");
const verify_user_dto_1 = require("./dto/verify-user.dto");
const resend_verification_dto_1 = require("./dto/resend-verification.dto");
const google_guard_1 = require("../guards/google.guard");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    signUp({ age, email, fullName, password }) {
        return this.authService.signUp({ email, fullName, password, age });
    }
    signIn({ email, password }) {
        return this.authService.signIn({ email, password });
    }
    signInWithGoogle() { }
    async signInWithGoogleCallback(req, res) {
        const { token, redirectUri } = await this.authService.continueWithGoogle(req.user);
        res.cookie('accessToken', token, { maxAge: 60 * 60 * 1000 });
        res.redirect(redirectUri);
    }
    verifyUser({ OTPCode, email }) {
        return this.authService.verifyUser({ OTPCode, email });
    }
    resendVerificationCode({ email }) {
        return this.authService.resendVerificationCode({ email });
    }
    getCurrentUser(userId) {
        return this.authService.getCurrentUser(userId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('sign-in'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signInWithGoogle", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInWithGoogleCallback", null);
__decorate([
    (0, common_1.Post)('verify-user'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_user_dto_1.VerifyUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.Post)('resend-verification'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_verification_dto_1.ResendVerificationCode]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resendVerificationCode", null);
__decorate([
    (0, common_1.Get)('current-user'),
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard),
    __param(0, (0, user_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCurrentUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map