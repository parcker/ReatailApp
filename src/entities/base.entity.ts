import {UpdateDateColumn, CreateDateColumn} from 'typeorm';

export abstract class BaseEntityClass{

    @CreateDateColumn()
    public dateCreated?: Date;

    @UpdateDateColumn()
    public dateUpdated?: Date;

    public isDisabled:boolean;
}