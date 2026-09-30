import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResendVerificationCode } from './dto/resend-verification.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp({ age, email, fullName, password }: SignUpDto): Promise<{
        success: boolean;
        message: string;
    }>;
    signIn({ email, password }: SignInDto): Promise<{
        token: string;
    }>;
    signInWithGoogle(): void;
    signInWithGoogleCallback(req: any, res: any): Promise<void>;
    verifyUser({ OTPCode, email }: VerifyUserDto): Promise<{
        token: string;
    }>;
    resendVerificationCode({ email }: ResendVerificationCode): Promise<string>;
    getCurrentUser(userId: any): Promise<(import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../users/schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
