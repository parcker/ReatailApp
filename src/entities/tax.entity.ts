import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Supplier } from './partner.entity';
import { Business } from './business.entity';
import { PurchaseOrder } from './order.entity';

@Entity()
export class Tax extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length:"100"})
    name: string;
    
    @Column({length:"10"})
    @Column()
    code: string;

    @Column({type:"decimal"})
    value: number;

    @ManyToOne(type => Business, business => business.tax,{cascade:true})
    @JoinColumn()
    business: Business;
}