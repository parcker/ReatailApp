import {UpdateDateColumn, CreateDateColumn} from 'typeorm';

export abstract class BaseEntityClass{

    @CreateDateColumn({ type: "timestamp"})
    public dateCreated?: Date;

    @UpdateDateColumn({type: "timestamp"})
    public dateUpdated?: Date;

    public isDisabled:boolean;
}