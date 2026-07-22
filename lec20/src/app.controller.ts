import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('lang', new DefaultValuePipe('en')) lang): string {
    return this.appService.getHello(lang);
  }
}
