import { NestMiddleware} from "@nestjs/common";
 

export class CorsMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        throw new Error("Method not implemented.");
    }
   
}