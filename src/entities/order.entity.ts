import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany} from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Supplier } from './partner.entity';
import { Business, BusinessLocation } from './business.entity';
import { Product } from './product.entity';
@Entity()
export class Order extends BaseEntityClass {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
   
    invoiceNumber:string;

    @Column()
   
    orderstatus:number;


    @Column()
   totalcostprice:number;

    @ManyToOne(type => Business, business => business.order)
    @JoinColumn()
    business: Business;

    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.order)
    @JoinColumn()
    businesslocation: BusinessLocation;

    @ManyToOne(type => Supplier, supplier => supplier.order)
    supplier: Supplier;

    @OneToMany(type => OrderPayment, orderpayment => orderpayment.order)
    orderpayment: OrderPayment[];

    @OneToMany(type => OrderItem, orderitem => orderitem.order)
    orderitem: OrderItem[];
}
@Entity()
export class OrderItem extends BaseEntityClass {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Product, product => product.orderitem)
    @JoinColumn()
    product: Product;

    @Column()
   
    qty:number;

    @Column()
   
    cost:number;

    @Column()
   
    unitprice:number;

    @Column()
   
    previousqty:number;

    @ManyToOne(type => Order, order => order.orderitem)
    order: Order;


}
@Entity()
export class OrderPayment extends BaseEntityClass {
   
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Order, order => order.orderpayment)
    @JoinColumn()
    order: Order;
    
    @Column()
   
    paymenttype:string;

    @Column()
   
    paymentdate:string;

    @Column()
   
    amountpaid:number;

    @Column()
   
    balnce:number;

}