import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! 123';
  }


  getUsers(){
    return [
      {id: 1, name: "giorgi", age: 22},
      {id: 2, name: "Nika", age: 24},
    ]
  }

  getAllPosts(){
    return [
      {id: 1, title: "post 1", content: "post 1"},
      {id: 2, title: "post 2", content: "post 2"},
    ]
  }
}
