import {UpdateDateColumn, CreateDateColumn} from 'typeorm';

export abstract class BaseEntityClass{

    @CreateDateColumn({ type: "timestamp",precision: null /* or any other */, default: () => "CURRENT_TIMESTAMP" })
    public dateCreated?: Date;

    @UpdateDateColumn({type: "timestamp"})
    public dateUpdated?: Date;

    public isDisabled:boolean;
}