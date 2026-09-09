import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsAuthGuard } from 'src/guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';


// https://localhost:3000/auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('sign-up')
  @UseGuards(ThrottlerGuard)
  @Throttle({default: {ttl: 60 * 1000, limit: 3}})
  @ApiBadRequestResponse({example: {
  "message": "User already exists",
  "error": "Bad Request",
  "statusCode": 400
}})
  @ApiCreatedResponse({example: {success: true, message:"user created successfuuly"}})
  signUp(@Body() {age, email, fullName, password}: SignUpDto){
    return this.authService.signUp({email, fullName, password, age})
  }

  @Post('sign-in')
  @UseGuards(ThrottlerGuard)
  @ApiBadRequestResponse({example: {
    "message": "Email or password is invalid",
    "error": "Bad Request",
    "statusCode": 400
  }})
  @ApiCreatedResponse({example: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWExNzcwM2ExZGFmNzE4YzY5NjUwMTAiLCJpYXQiOjE3ODg5NjY5MjQsImV4cCI6MTc4ODk3MDUyNH0.bXFw16Tjbe1O51UNJiQap5TpXEW7p_rGxlx6KFPjJ_g"}})
  signIn(@Body() {email, password}: SignInDto){
    return this.authService.signIn({email, password})
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    example: {
      "message": "Forbidden resource",
      "error": "Forbidden",
      "statusCode": 403
    }
  })
  @ApiResponse({example: {
  "_id": "6aa17703a1daf718c6965010",
  "fullName": "giorgi giorgadze",
  "email": "giorgi@gmail.com",
  "age": 22,
  "expenses": [],
  "createdAt": "2026-09-09T15:10:59.047Z",
  "updatedAt": "2026-09-09T15:10:59.047Z",
  "__v": 0
}})
  getCurrentUser(@UserId() userId){
    return this.authService.getCurrentUser(userId)
  }
}
