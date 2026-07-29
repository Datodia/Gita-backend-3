import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HalfRejectMiddleware } from 'src/middlewares/half-reject.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schema/user.schema';
import { expenseSchema } from 'src/expenses/schema/expense.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'user', schema: userSchema},
      {name: 'expense', schema: expenseSchema},
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(HalfRejectMiddleware)
      // .forRoutes({path: '/users', method: RequestMethod.GET})
  }
}
