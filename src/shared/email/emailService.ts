import{}from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService{

    constructor(private readonly mailerService: MailerService) {}
    public sendmail(mailto:string, mailsubject:string, username:string): void {
        this .mailerService
          .sendMail({
            to: mailto, // sender address
            from: process.env.EMAIL_FROM, // list of receivers
            subject: mailsubject+'✔', // Subject line
            text: 'welcome', // plaintext body
            html: `<b>welcome to mint-retial platform</b> 
                    <h2>Hi username : ${username.toUpperCase()} </h2> 
                    click the below link for for your account to be acctivated 
                    <a style="background-color:#2C78FF;border:1px solid #333333;border-color:#2C78FF;border-radius:4px;border-width:0px;color:#ffffff;display:inline-block;font-family:helvetica,arial,sans-serif;font-size:16px;font-weight:normal;letter-spacing:1px;line-height:25px;padding:12px 18px 12px 18px;text-align:center;text-decoration:none;width:100%" href="http://omniview.fintory.io/set-password?token=$TOKEN$" target="_blank">Set password</a> `, // HTML body content
          })
          .then(() => {console.log('mail sending worked')})
          .catch(() => {});
      }
  

}