import { Injectable } from '@nestjs/common';
import { EmailSenderService } from './email-sender/email-sender.service';

@Injectable()
export class AppService {
  constructor(
    private emailSenderService: EmailSenderService
  ){}

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


  sendEmail(to, subject, text){
    this.emailSenderService.sendEmailToSomeone({to, subject, text})
  }

  async sendEmailToStudents(){
    const emails = [
      'zviadisva@gmail.com',
      'kvitsinadze.nodo@gmail.com',
      'giozarku@gmail.com',
      'dato.diasamidze.02@gmail.com',
      'nikushanika568@gmail.com',
      'test@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
      'test1@gmail.com',
    ]

    // await this.emailSenderService.sendEmailToSomeonBCC(emails)

    for(let email of emails){
      this.emailSenderService.sendWelcomeMessage(email)
    }
    // const promises = emails.map(email => this.emailSenderService.sendEmailToSomeone({to: email, subject: 'test', text: "hello"}))
    //sleep 
    // Promise.all(promises)
  }
}
