import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { HasUserEmailInHeaders } from 'src/middlewares/has-user-email-in-header.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { expenseSchema } from './schema/expense.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'expense', schema: expenseSchema}
    ]),
    UsersModule
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService]
})
export class ExpensesModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer 
    //   .apply(HasUserEmailInHeaders)
    //   .forRoutes({path: '/expenses', method: RequestMethod.POST})
  }
}
