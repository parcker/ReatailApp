import { UpdateDateColumn, CreateDateColumn, Column } from 'typeorm';

export abstract class BaseEntityClass {

    @CreateDateColumn({ type: "timestamp" })
    public dateCreated?: Date;
    @UpdateDateColumn({ type: "timestamp" })
    public dateUpdated?: Date;
    
    @Column({default: true})
    public isDisabled?: boolean;
    
    @Column({ length: "300" ,nullable: true})
    createdby?: string;

    @Column({ length: "300" ,nullable: true })
    updatedby?: string;

    @Column({ length: "300" ,nullable: true })
    deletedby?: string;

    @Column({ length: "300" ,nullable: true })
    approvedby?: string;

   
   
}