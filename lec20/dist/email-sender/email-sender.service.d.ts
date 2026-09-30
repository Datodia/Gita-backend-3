import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dto/send-email.dto';
export declare class EmailSenderService {
    private emailService;
    constructor(emailService: MailerService);
    sendEmailToSomeone({ subject, text, to }: SendEmailDto): Promise<void>;
    sendEmailToSomeonBCC(bcc: any): Promise<void>;
    sendWelcomeMessage(to: string): Promise<void>;
    verifyUser(to: string, OTPCode: string): Promise<void>;
}
