import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsAuthGuard } from 'src/guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResendVerificationCode } from './dto/resend-verification.dto';
import { GoogleGuard } from 'src/guards/google.guard';


// https://localhost:3000/auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('sign-up')
  @UseGuards(ThrottlerGuard)
  // @Throttle({default: {ttl: 60 * 1000, limit: 3}})
  signUp(@Body() {age, email, fullName, password}: SignUpDto){
    return this.authService.signUp({email, fullName, password, age})
  }

  @Post('sign-in')
  @UseGuards(ThrottlerGuard)
  signIn(@Body() {email, password}: SignInDto){
    return this.authService.signIn({email, password})
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  signInWithGoogle(){}

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async signInWithGoogleCallback(
    @Req() req, @Res() res
  ){
    const {token, redirectUri} = await this.authService.continueWithGoogle(req.user)
    
    res.cookie('accessToken', token, {maxAge: 60 * 60 * 1000})
    res.redirect(redirectUri)
  }


  @Post('verify-user')
  @HttpCode(200)
  verifyUser(@Body() {OTPCode, email}:VerifyUserDto){
    return this.authService.verifyUser({OTPCode, email})
  }

  @Post('resend-verification')
  @HttpCode(200)
  resendVerificationCode(@Body() {email}:ResendVerificationCode){
    return this.authService.resendVerificationCode({email})
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  getCurrentUser(@UserId() userId){
    return this.authService.getCurrentUser(userId)
  }
}
