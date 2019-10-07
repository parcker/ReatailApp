import{}from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService{

    constructor(private readonly mailerService: MailerService) {}
    public sendmail(mailto:string, mailsubject:string,template:string,data:any): void {

        console.log(__dirname+'/templates');
        console.log(template);
        console.log(data);
        this .mailerService
          .sendMail({
            to: mailto, // sender address
            from: process.env.EMAIL_FROM, // list of receivers
            subject: mailsubject+'✔', // Subject line
            template: template, // HTML body content
            context:data
          })
          .then(() => {console.log('mail sending worked')})
          .catch((error) => {console.log('mail error:'+error)});
      }
  

}