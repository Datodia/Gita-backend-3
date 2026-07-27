import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './expenses/expenses.module';
import { UsersModule } from './users/users.module';
import { UserAgentMiddleware } from './middlewares/user-agent.middleware';

@Module({
  imports: [ExpensesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // This is Global middleware
    consumer
      .apply(UserAgentMiddleware)
      .forRoutes('*')

    consumer
      .apply(UserAgentMiddleware)
      .exclude({path: '/users', method: RequestMethod.POST})
      .forRoutes({path: '/users', method: RequestMethod.ALL})

    consumer
      .apply(UserAgentMiddleware)
      .exclude({path: '/users/:id', method: RequestMethod.DELETE})
      .forRoutes({path: '/users/:id', method: RequestMethod.ALL})
  }
}
