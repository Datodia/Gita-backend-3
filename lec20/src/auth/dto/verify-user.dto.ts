import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class VerifyUserDto {

  @IsNotEmpty()
  @IsEmail()
  email!: string;


  @IsNotEmpty()
  @IsString()
  OTPCode!: string;
}
