import {CreateDateColumn, UpdateDateColumn, Entity} from 'typeorm';

export abstract class BaseEntityClass{

    @CreateDateColumn({name : 'date_created',default:""})
    public dateCreated?: string

    @UpdateDateColumn({name : 'date_updateded',default:""})
    public dateUpdated?: string

    public isDisabled:boolean
}