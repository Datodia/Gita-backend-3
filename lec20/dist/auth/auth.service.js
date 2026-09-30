"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const email_sender_service_1 = require("../email-sender/email-sender.service");
let AuthService = class AuthService {
    userModel;
    jwtService;
    emailSenderService;
    constructor(userModel, jwtService, emailSenderService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.emailSenderService = emailSenderService;
    }
    async signUp({ age, email, fullName, password }) {
        const existUser = await this.userModel.findOne({ email });
        if (existUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otpCode = Math.random().toString().slice(2, 8);
        const otpCodeExpirationDate = new Date().setTime(new Date().getTime() + 5 * 60 * 1000);
        const newUser = await this.userModel.create({
            email,
            age,
            fullName,
            password: hashedPassword,
            OTPCode: otpCode,
            OTPCodeExpirationDate: otpCodeExpirationDate
        });
        await this.emailSenderService.verifyUser(email, otpCode);
        return {
            success: true,
            message: "Check email for verify"
        };
    }
    async signIn({ password, email }) {
        const existUser = await this.userModel.findOne({ email }).select('+password');
        if (!existUser) {
            throw new common_1.BadRequestException('Email or password is invalid');
        }
        const isPassEqual = await bcrypt.compare(password, existUser.password);
        if (!isPassEqual) {
            throw new common_1.BadRequestException('Email or password is invalid');
        }
        if (!existUser.isVerified) {
            throw new common_1.BadRequestException('User is not verified');
        }
        const payLoad = {
            userId: existUser._id,
        };
        const token = await this.jwtService.sign(payLoad, { expiresIn: '1h' });
        return { token };
    }
    async continueWithGoogle(user) {
        let existUser = await this.userModel.findOne({ email: user.email });
        if (!existUser) {
            existUser = await this.userModel.create({
                email: user.email,
                fullName: user.fullName,
                profilePic: user.profilePic
            });
        }
        existUser.fullName = user.fullName;
        existUser.profilePic = user.profilePic;
        existUser.isVerified = true;
        existUser.save();
        const payLoad = {
            userId: existUser._id,
        };
        const token = await this.jwtService.sign(payLoad, { expiresIn: '1h' });
        return { token, redirectUri: process.env.FRONTEND_URL };
    }
    async verifyUser({ OTPCode, email }) {
        const existUser = await this.userModel.findOne({ email });
        if (!existUser)
            throw new common_1.BadRequestException('User not found');
        if (existUser.OTPCode !== OTPCode)
            throw new common_1.BadRequestException('OTP Code is invalid');
        if (new Date().getTime() > existUser.OTPCodeExpirationDate) {
            throw new common_1.BadRequestException('OTP Code is outdated');
        }
        await this.userModel.findByIdAndUpdate(existUser._id, {
            OTPCode: null,
            OTPCodeExpirationDate: null,
            isVerified: true
        });
        const payLoad = {
            userId: existUser._id,
        };
        const token = await this.jwtService.sign(payLoad, { expiresIn: '1h' });
        return { token };
    }
    async resendVerificationCode({ email }) {
        const existUser = await this.userModel.findOne({ email });
        if (!existUser)
            throw new common_1.BadRequestException('User not found');
        if (existUser.isVerified)
            throw new common_1.BadRequestException('You already verified');
        if (new Date().getTime() < existUser.OTPCodeExpirationDate) {
            throw new common_1.BadRequestException('OTP Code is not outdated yet');
        }
        const otpCode = Math.random().toString().slice(2, 8);
        const otpCodeExpirationDate = new Date().setTime(new Date().getTime() + 5 * 60 * 1000);
        await this.userModel.findByIdAndUpdate(existUser._id, {
            OTPCode: otpCode,
            OTPCodeExpirationDate: otpCodeExpirationDate,
            isVerified: false
        });
        await this.emailSenderService.verifyUser(email, otpCode);
        return 'Check email to vetify';
    }
    async getCurrentUser(userId) {
        return this.userModel.findById(userId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        email_sender_service_1.EmailSenderService])
], AuthService);
//# sourceMappingURL=auth.service.js.map