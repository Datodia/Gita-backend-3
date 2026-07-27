import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { HasUserEmailInHeaders } from 'src/middlewares/has-user-email-in-header.middleware';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService]
})
export class ExpensesModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer 
      .apply(HasUserEmailInHeaders)
      .forRoutes({path: '/expenses', method: RequestMethod.POST})
  }
}
