import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany} from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Business } from './business.entity';
import { Order } from './order.entity';

@Entity()
export class Customer extends BaseEntityClass{

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
   
    fullname:string;
    @ManyToOne(() => Business, business => business.customer)
    @JoinColumn()
    business: Business;
    @Column()
   
    mobilenumber:string;
    @Column()
    email:string;
    @Column()
    gender:number;
    @Column()
    age:number;
    @Column()
    birthday:number;
    @Column()
    birthmonth:string;
}
@Entity()
export class Supplier extends BaseEntityClass{

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
   
    companyname:string;
    @ManyToOne(() => Business, business => business.supplier)
    @JoinColumn()
    business: Business;
    @Column()
   
    mobilenumber:string;
   
    @Column()
   
    email:string;

    @Column()
   
    address:string;
    
    @OneToMany(type => Order, order => order.supplier)
    order: Order[];
    
}