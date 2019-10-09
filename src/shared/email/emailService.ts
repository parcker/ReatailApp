import{}from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService{

    constructor(private readonly mailerService: MailerService) {}
    public sendmail(mailto:string, mailsubject:string,template:string,data:any): boolean {

        console.log(__dirname + '/templates');
        console.log(template);
        
        let mailstatus=false;
        this .mailerService.sendMail({
                    to: mailto, // sender address
                    from: process.env.EMAIL_FROM, // list of receivers
                    subject: mailsubject+'✔', // Subject line
                    template:template, // HTML body content
                    context:data
                  })
                  .then(() => {mailstatus=true;console.log('Email Sent')})
                  .catch((error) => {mailstatus=false;console.log('Email Error'+error)});
             return mailstatus;     
               
        }
  

}