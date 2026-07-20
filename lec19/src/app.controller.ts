import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


// Http 
// http://localhost:3000/
@Controller()
export class AppController {
  // DI Dependency injection
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // app.get('/users', (req, res) => {})
  // @Get('users')
  // getUsers(){
  //   return this.appService.getUsers()
  // }


  @Get('posts')
  getAllPosts(){
    return this.appService.getAllPosts()
  }
}
