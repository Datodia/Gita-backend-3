import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResendVerificationCode } from './dto/resend-verification.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('user') private userModel: Model<User>,
        private jwtService: JwtService,
        private emailSenderService: EmailSenderService,
    ){}

    async signUp({age,email,fullName,password}: SignUpDto){
        const existUser = await this.userModel.findOne({email})

        if(existUser){
            throw new BadRequestException('User already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const otpCode = Math.random().toString().slice(2,8)
        const otpCodeExpirationDate = new Date().setTime(new Date().getTime() + 5 * 60 * 1000)

        const newUser = await this.userModel.create({
            email,
            age,
            fullName,
            password: hashedPassword,
            OTPCode: otpCode,
            OTPCodeExpirationDate: otpCodeExpirationDate
        })

        await this.emailSenderService.verifyUser(email, otpCode)

        return {
            success: true,
            message: "Check email for verify"
        }
    }

    async signIn({password, email}: SignInDto){
        const existUser = await this.userModel.findOne({email}).select('+password')

        if(!existUser){
            throw new BadRequestException('Email or password is invalid')
        }

        const isPassEqual = await bcrypt.compare(password, existUser.password)
        if(!isPassEqual){
            throw new BadRequestException('Email or password is invalid')
        }

        if(!existUser.isVerified){
            throw new BadRequestException('User is not verified')
        }

        const payLoad = {
            userId: existUser._id,
        }
        const token = await this.jwtService.sign(payLoad, {expiresIn: '1h'})
        return {token}
    }

    async verifyUser({OTPCode, email}: VerifyUserDto){
        const existUser = await this.userModel.findOne({email})
        if(!existUser) throw new BadRequestException('User not found')

        if(existUser.OTPCode !== OTPCode) throw new BadRequestException('OTP Code is invalid')

        if(new Date().getTime() > existUser.OTPCodeExpirationDate!){
            throw new BadRequestException('OTP Code is outdated')
        }

        await this.userModel.findByIdAndUpdate(existUser._id, {
            OTPCode: null,
            OTPCodeExpirationDate: null,
            isVerified: true
        })

        const payLoad = {
            userId: existUser._id,
        }
        const token = await this.jwtService.sign(payLoad, {expiresIn: '1h'})
        return {token}

    }

    async resendVerificationCode({email}: ResendVerificationCode){
        const existUser = await this.userModel.findOne({email})
        if(!existUser) throw new BadRequestException('User not found')

        if(existUser.isVerified) throw new BadRequestException('You already verified')

        if(new Date().getTime() < existUser.OTPCodeExpirationDate!) {
            throw new BadRequestException('OTP Code is not outdated yet')
        }

        const otpCode = Math.random().toString().slice(2,8)
        const otpCodeExpirationDate = new Date().setTime(new Date().getTime() + 5 * 60 * 1000)

        await this.userModel.findByIdAndUpdate(existUser._id, {
            OTPCode: otpCode,
            OTPCodeExpirationDate: otpCodeExpirationDate,
            isVerified: false
        })
        await this.emailSenderService.verifyUser(email, otpCode)
        return 'Check email to vetify'
    }

    async getCurrentUser(userId){
        return this.userModel.findById(userId)
    }

}
