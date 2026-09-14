import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/users/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: 'user', schema: userSchema }
  ]),
    EmailSenderModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
