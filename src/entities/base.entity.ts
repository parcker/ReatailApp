import {UpdateDateColumn, CreateDateColumn} from 'typeorm';

export abstract class BaseEntityClass{

    @CreateDateColumn({ precision: 4, default: () => "CURRENT_TIMESTAMP" })
    public dateCreated?: Date;

    @UpdateDateColumn({ precision: 4, default: () => "CURRENT_TIMESTAMP" })
    public dateUpdated?: Date;

    public isDisabled:boolean;
}