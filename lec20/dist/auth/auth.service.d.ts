import { SignUpDto } from './dto/sign-up.dto';
import { Model } from 'mongoose';
import { User } from "../users/schema/user.schema";
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailSenderService } from "../email-sender/email-sender.service";
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResendVerificationCode } from './dto/resend-verification.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    private emailSenderService;
    constructor(userModel: Model<User>, jwtService: JwtService, emailSenderService: EmailSenderService);
    signUp({ age, email, fullName, password }: SignUpDto): Promise<{
        success: boolean;
        message: string;
    }>;
    signIn({ password, email }: SignInDto): Promise<{
        token: string;
    }>;
    continueWithGoogle(user: any): Promise<{
        token: string;
        redirectUri: string | undefined;
    }>;
    verifyUser({ OTPCode, email }: VerifyUserDto): Promise<{
        token: string;
    }>;
    resendVerificationCode({ email }: ResendVerificationCode): Promise<string>;
    getCurrentUser(userId: any): Promise<(import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
