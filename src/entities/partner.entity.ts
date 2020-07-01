import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Business, BusinessLocation } from './business.entity';
import {PurchaseOrder } from './order.entity';
import { Sales } from './sales.entity';

@Entity()
export class Customer extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    fullname: string;
    @Column()
    mobilenumber: string;
    @Column()
    email: string;
    @Column()
    gender: number;
    @Column()
    age: number;
    @Column()
    birthday: number;
    @Column()
    birthmonth: string;

    @ManyToOne(() => BusinessLocation)
    @JoinColumn()
    businesslocation: BusinessLocation;

    @OneToMany(type => Sales, sales => sales.customer)
    sales: Sales[];

}
@Entity()
export class Supplier extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    companyname: string;
    @Column()
    mobilenumber: string;
    @Column()
    email: string;
    @Column()
    address: string;
    @Column()
    website: string;
    @Column()
    contactpersonname: string;
    @Column()
    contactpersonphonenumber: string;
    @Column()
    contactpersonemail:string;
    @Column()
    street:string;
    @Column()
    facebook:string;
    @Column()
    instagram:string;
    @Column()
    twitter:string;
   
    @ManyToOne(() => Business, business => business.suppliers)
    @JoinColumn()
    business: Business;
    
    @ManyToOne(() => BusinessLocation)
    @JoinColumn()
    registeredlocation: BusinessLocation;
    
    @OneToMany(type => PurchaseOrder, purchaseorder => purchaseorder.supplier)
    purchaseorder: PurchaseOrder[];

}