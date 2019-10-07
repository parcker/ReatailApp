import {UpdateDateColumn, CreateDateColumn} from 'typeorm';

export abstract class BaseEntityClass{

    @CreateDateColumn({ precision: null, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public dateCreated?: Date;

    @UpdateDateColumn({  precision: null, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public dateUpdated?: Date;

    public isDisabled:boolean;
}