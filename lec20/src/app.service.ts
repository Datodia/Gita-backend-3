import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  private resp = {
    en: {
      text: "hello world"
    },
    ka: {
      text: "გამარჯობა სამყარო"
    }
  }

  getHello(lang: string): string {
    return this.resp[lang].text
  }
}
