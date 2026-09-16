import { PickType } from '@nestjs/mapped-types';
import { VerifyUserDto } from './verify-user.dto';

export class ResendVerificationCode extends PickType(VerifyUserDto, ['email']){}
