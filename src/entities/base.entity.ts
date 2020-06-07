import { UpdateDateColumn, CreateDateColumn, Column } from 'typeorm';

export abstract class BaseEntityClass {

    @CreateDateColumn({ type: "timestamp" })
    public dateCreated?: Date;
    @UpdateDateColumn({ type: "timestamp" })
    public dateUpdated?: Date;
    @Column()
    public isDisabled?: boolean;
    @Column()
    createdby?: string;
    @Column()
    updatedby?: string;
    @Column()
    public IsActive: boolean;
}