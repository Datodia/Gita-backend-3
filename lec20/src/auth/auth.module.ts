import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/users/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
   
    MongooseModule.forFeature([
    { name: 'user', schema: userSchema }
  ])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
