import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailSenderService {
    constructor(private emailService: MailerService){}


    async sendEmailToSomeone({subject,text,to}: SendEmailDto){
        const options = {
            to,
            subject,
            from: 'Gita Back 3 <ketigelovani.gmail.com>',
            text
        }

        await this.emailService.sendMail(options)
        console.log('Email Sent successfully')
    }


    async sendEmailToSomeonBCC(bcc){
        const options = {
            bcc,
            subject: "Test",
            from: 'Gita Back 3 <ketigelovani.gmail.com>',
            text: "Random text again"
        }

        await this.emailService.sendMail(options)
        console.log('Email Sent successfully')
    }


    async sendWelcomeMessage(to: string){
        const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Welcome to Gita Back 3</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f5f7;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

            <tr>
              <td align="center" style="background:linear-gradient(135deg,#4f46e5,#7c3aed);background-color:#4f46e5;padding:40px 32px;">
                <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.3;font-weight:700;">Welcome aboard! 🎉</h1>
                <p style="margin:12px 0 0;color:#e0e7ff;font-size:16px;line-height:1.5;">We are glad to have you at Gita Back 3</p>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 16px;color:#111827;font-size:16px;line-height:1.6;">Hi there,</p>
                <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
                  Your account is ready. You can now sign in and start exploring everything we have built for you.
                </p>
                <p style="margin:0 0 28px;color:#374151;font-size:16px;line-height:1.6;">
                  If you have any questions, just reply to this email &mdash; we read every message.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                  <tr>
                    <td align="center" style="border-radius:8px;background-color:#4f46e5;">
                      <a href="https://example.com/login"
                         style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;border-radius:8px;">
                        Get Started
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 32px;">
                <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 32px;">
                <p style="margin:0 0 12px;color:#111827;font-size:14px;font-weight:600;">What you can do next</p>
                <p style="margin:0 0 8px;color:#6b7280;font-size:14px;line-height:1.6;">✅ Complete your profile</p>
                <p style="margin:0 0 8px;color:#6b7280;font-size:14px;line-height:1.6;">📚 Browse the documentation</p>
                <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">💬 Join the community chat</p>
              </td>
            </tr>

            <tr>
              <td align="center" style="background-color:#f9fafb;padding:24px 32px;">
                <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">
                  You received this email because an account was created with this address.
                </p>
                <p style="margin:8px 0 0;color:#9ca3af;font-size:12px;line-height:1.5;">
                  &copy; ${new Date().getFullYear()} Gita Back 3. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

        const options = {
            to,
            subject: 'Welcome to Gita Back 3 🎉',
            from: 'Gita Back 3 <ketigelovani.gmail.com>',
            text: 'Welcome aboard! Your account is ready. Sign in and start exploring Gita Back 3.',
            html
        }

        await this.emailService.sendMail(options)
        console.log('Welcome email sent successfully')
    }

    async verifyUser(to: string, OTPCode: string){
        const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your verification code</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f5f7;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

            <tr>
              <td align="center" style="background:linear-gradient(135deg,#4f46e5,#7c3aed);background-color:#4f46e5;padding:40px 32px;">
                <h1 style="margin:0;color:#ffffff;font-size:26px;line-height:1.3;font-weight:700;">Verify your email 🔐</h1>
                <p style="margin:12px 0 0;color:#e0e7ff;font-size:16px;line-height:1.5;">One quick step to secure your account</p>
              </td>
            </tr>

            <tr>
              <td style="padding:32px 32px 8px;">
                <p style="margin:0 0 16px;color:#111827;font-size:16px;line-height:1.6;">Hi there,</p>
                <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.6;">
                  Use the one-time code below to finish verifying your Gita Back 3 account.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:0 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;">
                  <tr>
                    <td align="center" style="padding:24px 40px;">
                      <p style="margin:0 0 8px;color:#6d28d9;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Your code</p>
                      <p style="margin:0;color:#4c1d95;font-size:34px;font-weight:700;letter-spacing:10px;font-family:'Courier New',Courier,monospace;">${OTPCode}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 8px;">
                <p style="margin:0 0 8px;color:#374151;font-size:14px;line-height:1.6;">⏱️ This code expires in 5 minutes.</p>
                <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.6;">🔒 Never share it with anyone &mdash; our team will never ask you for it.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 32px;">
                <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px 28px;">
                <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
                  Did not request this code? You can safely ignore this email &mdash; nothing will change on your account.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="background-color:#f9fafb;padding:24px 32px;">
                <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">
                  This email was sent to ${to} for account verification.
                </p>
                <p style="margin:8px 0 0;color:#9ca3af;font-size:12px;line-height:1.5;">
                  &copy; ${new Date().getFullYear()} Gita Back 3. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

        const options = {
            to,
            subject: `${OTPCode} is your Gita Back 3 verification code`,
            from: 'Gita Back 3 <ketigelovani.gmail.com>',
            text: `Your Gita Back 3 verification code is ${OTPCode}. It expires in 10 minutes. If you did not request it, ignore this email.`,
            html
        }

        await this.emailService.sendMail(options)
        console.log('OTP email sent successfully')
    }
}
