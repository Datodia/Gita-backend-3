import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsAuthGuard } from 'src/guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';


// https://localhost:3000/auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @UseGuards(ThrottlerGuard)
  @Throttle({default: {ttl: 60 * 1000, limit: 3}})
  signUp(@Body() {age, email, fullName, password}: SignUpDto){
    return this.authService.signUp({email, fullName, password, age})
  }

  @Post('sign-in')
  @UseGuards(ThrottlerGuard)
  signIn(@Body() {email, password}: SignInDto){
    return this.authService.signIn({email, password})
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  getCurrentUser(@UserId() userId){
    return this.authService.getCurrentUser(userId)
  }
}
