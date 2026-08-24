import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './expenses/expenses.module';
import { UsersModule } from './users/users.module';
import { UserAgentMiddleware } from './middlewares/user-agent.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'pino-nestjs';
import { ProductsModule } from './products/products.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({isGlobal: true}),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true },
        },
      },
    }),
    ThrottlerModule.forRoot([{ ttl: 60 * 1000, limit: 20 }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // JwtModule.registerAsync({
    //   global: true,
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get('JWT_SECRET')
    //   }),
    //   inject: [ConfigService]
    // }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    ExpensesModule,
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // This is Global middleware
    // consumer
    //   .apply(UserAgentMiddleware)
    //   .forRoutes('*')
    // consumer
    //   .apply(UserAgentMiddleware)
    //   .exclude({path: '/users', method: RequestMethod.POST})
    //   .forRoutes({path: '/users', method: RequestMethod.ALL})
    // consumer
    //   .apply(UserAgentMiddleware)
    //   .exclude({path: '/users/:id', method: RequestMethod.DELETE})
    //   .forRoutes({path: '/users/:id', method: RequestMethod.ALL})
  }
}
