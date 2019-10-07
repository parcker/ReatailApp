import {UpdateDateColumn} from 'typeorm';

export abstract class BaseEntityClass{

    @UpdateDateColumn({name : 'dateCreated',type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    public dateCreated?: Date;

    @UpdateDateColumn({name : 'dateUpdated',type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    public dateUpdated?: Date;

    public isDisabled:boolean;
}