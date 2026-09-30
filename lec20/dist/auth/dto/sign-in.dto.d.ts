import { SignUpDto } from './sign-up.dto';
declare const SignInDto_base: import("@nestjs/mapped-types").MappedType<Pick<SignUpDto, "email" | "password">>;
export declare class SignInDto extends SignInDto_base {
}
export {};
