import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, Index} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Business, BusinessLocation } from './business.entity';
import { Customer } from './partner.entity';


@Entity()
export class Sales extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Index()
    @ManyToOne(type => Customer, customer => customer.sales)
    @JoinColumn()
    customer: Customer;

    @Index()
    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.stockcard)
    @JoinColumn()
    businesslocation: BusinessLocation;
}
