import{}from 'nodemailer';
import { InternalServerErrorException } from '@nestjs/common';

export class EmailService{

    
    async sendmail(mailfrom:string, mailto:string,mailbody:string, mailsubject:string)
    {
        try
        {

            console.log('mailto'+mailto);
        
            const message = {
                from: mailfrom, // Sender address
                to: mailto,         // List of recipients
                subject: mailsubject, // Subject line
                html: mailbody // Plain text body
            };
          
           
        }
        catch(error)
        {
           throw new InternalServerErrorException(console.log(error))
        }
        

       
    }

}