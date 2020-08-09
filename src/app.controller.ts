import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    public root(): string {
        return 'Retail-Server is online!';
    }
}
