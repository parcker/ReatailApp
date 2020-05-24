import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from '../../entities/business.entity';
import { UtilityService } from './utility.service';

@Module({

    imports: [
        TypeOrmModule.forFeature([Business]),
      
      ],
      providers: [UtilityService],
      exports:[UtilityService]

})
export class UtilityModule {

}
