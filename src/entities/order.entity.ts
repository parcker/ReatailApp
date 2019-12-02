import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import { BaseEntityClass } from './base.entity';
import { Supplier } from './partner.entity';
import { Business, BusinessLocation } from './business.entity';
import { Product } from './product.entity';
@Entity()
export class Order extends BaseEntityClass {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    invoiceNumber:string;

    @Column()
    @IsNotEmpty()
    orderstatus:number;


    @Column()
    @IsNotEmpty()
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
    @IsNotEmpty()
    qty:number;

    @Column()
    @IsNotEmpty()
    cost:number;

    @Column()
    @IsNotEmpty()
    unitprice:number;

    @Column()
    @IsNotEmpty()
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
    @IsNotEmpty()
    paymenttype:string;

    @Column()
    @IsNotEmpty()
    paymentdate:string;

    @Column()
    @IsNotEmpty()
    amountpaid:number;

    @Column()
    @IsNotEmpty()
    balnce:number;

}