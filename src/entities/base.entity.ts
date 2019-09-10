import {UpdateDateColumn} from 'typeorm';

export abstract class BaseEntityClass{

    
    public dateCreated?: Date = new Date();

   // @UpdateDateColumn({name : 'date_updateded'})
    public dateUpdated?: Date = new Date();

    public isDisabled:boolean
}