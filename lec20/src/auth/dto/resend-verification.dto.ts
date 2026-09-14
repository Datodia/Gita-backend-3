import { PickType } from '@nestjs/mapped-types';
import { SignUpDto } from './sign-up.dto';
import { VerifyUserDto } from './verify-user.dto';

export class ResendVerificationCode extends PickType(VerifyUserDto, ['email']){}
