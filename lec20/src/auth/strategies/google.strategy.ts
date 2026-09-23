import { Injectable } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport'
import {Strategy} from 'passport-google-oauth2'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            callbackURL: process.env.GOOGLE_REDIRECT_URI!,
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            scope: ['profile', 'email']
        })
    }

    async validate(accessToken, refreshToken, profile, done) {
        done(null, {
            fullName: profile.displayName,
            email: profile.email,
            profilePic: profile.picture
        })
    }
}