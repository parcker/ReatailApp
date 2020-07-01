import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Supplier } from './partner.entity';
import { Business } from './business.entity';
import { PurchaseOrder } from './order.entity';

@Entity()
export class FiscalYear extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    public startdate?: Date;

    @Column()
    public enddate?: Date;

    @Column()
    public iscurrent: boolean;
    
    @Column()
    name: string;

    @OneToMany(type => Business, business => business.fiscalyear)
    @JoinColumn()
    business: Business[];

    
    @OneToMany(type => PurchaseOrder, purchaseorders => purchaseorders.fiscalyear)
    @JoinColumn()
    purchaseorders: PurchaseOrder[];

}