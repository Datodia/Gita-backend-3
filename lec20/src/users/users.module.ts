import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HalfRejectMiddleware } from 'src/middlewares/half-reject.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(HalfRejectMiddleware)
      // .forRoutes({path: '/users', method: RequestMethod.GET})
  }
}
