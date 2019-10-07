import {UpdateDateColumn} from 'typeorm';

export abstract class BaseEntityClass{

    @UpdateDateColumn({name : 'dateCreated',type: 'timestamp'})
    public dateCreated?: Date;

    @UpdateDateColumn({name : 'dateUpdated',type: 'timestamp'})
    public dateUpdated?: Date;

    public isDisabled:boolean;
}