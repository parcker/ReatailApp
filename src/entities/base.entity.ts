import {UpdateDateColumn} from 'typeorm';

export abstract class BaseEntityClass{

    @UpdateDateColumn({name : 'dateCreated'})
    public dateCreated?: Date = new Date();

    @UpdateDateColumn({name : 'dateUpdated'})
    public dateUpdated?: Date;

    public isDisabled:boolean;
}