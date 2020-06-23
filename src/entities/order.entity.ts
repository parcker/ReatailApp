import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Supplier } from './partner.entity';
import { Business, BusinessLocation } from './business.entity';
import { Product } from './product.entity';
@Entity()
export class PurchaseOrder extends BaseEntityClass {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    invoiceNumber: string;
    @Column()
    orderstatus: number;
    @Column()
    totalcostprice: number;
    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.purchaseorder)
    @JoinColumn()
    businesslocation: BusinessLocation;

    @ManyToOne(type => Supplier, supplier => supplier.purchaseorder)
    supplier: Supplier;

    @OneToMany(type => OrderPayment, orderpayment => orderpayment.purchaseorder)
    orderpayment: OrderPayment[];

    @OneToMany(type => OrderItem, orderitem => orderitem.purchaseorder)
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

    qty: number;

    @Column()

    cost: number;

    @Column()

    unitprice: number;

    @Column()

    previousqty: number;

    @ManyToOne(type => PurchaseOrder, purchaseorder => purchaseorder.orderitem)
    purchaseorder: PurchaseOrder;


}
@Entity()
export class OrderPayment extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => PurchaseOrder, purchaseorder => purchaseorder.orderpayment)
    @JoinColumn()
    purchaseorder: PurchaseOrder;

    @Column()

    paymenttype: string;

    @Column()

    paymentdate: string;

    @Column()

    amountpaid: number;

    @Column()

    balnce: number;

}