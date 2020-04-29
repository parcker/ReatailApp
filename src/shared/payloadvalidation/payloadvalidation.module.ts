import { Module } from '@nestjs/common';
import { PayloadvalidationService } from './payloadvalidation.service';

@Module({
    providers: [PayloadvalidationService],
    exports: [PayloadvalidationService]
})
export class PayloadvalidationModule {}
