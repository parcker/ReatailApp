import { Module } from '@nestjs/common';
import { EmailService } from './emailService';

@Module({
    providers: [EmailService],
    exports: [EmailService]
})
export class EmailModule {}
