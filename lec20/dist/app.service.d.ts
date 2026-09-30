import { EmailSenderService } from './email-sender/email-sender.service';
export declare class AppService {
    private emailSenderService;
    constructor(emailSenderService: EmailSenderService);
    private resp;
    getHello(lang: string): string;
    sendEmail(to: any, subject: any, text: any): void;
    sendEmailToStudents(): Promise<void>;
}
