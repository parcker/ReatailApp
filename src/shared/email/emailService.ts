import{}from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService{

    constructor(private readonly mailerService: MailerService) {}
    public sendmail(mailto:string, mailsubject:string): void {
        this .mailerService
          .sendMail({
            to: mailto, // sender address
            from: process.env.EMAIL_FROM, // list of receivers
            subject: mailsubject+'✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome to mint-retial platform</b>', // HTML body content
          })
          .then(() => {console.log('mail sending worked')})
          .catch(() => {});
      }
  

}