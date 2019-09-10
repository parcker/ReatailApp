import {CreateDateColumn, UpdateDateColumn, Entity, Timestamp} from 'typeorm';

export abstract class BaseEntityClass{

    @CreateDateColumn({name : 'date_created'})
    public dateCreated?: Timestamp

    @UpdateDateColumn({name : 'date_updateded'})
    public dateUpdated?: Timestamp

    public isDisabled:boolean
}