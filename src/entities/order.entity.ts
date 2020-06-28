import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Supplier } from './partner.entity';
import { Business, BusinessLocation } from './business.entity';
import { Product } from './product.entity';
import { FiscalYear } from './fiscalyear.entity';
import { PurchaseOrderPayment } from './purchaseorderpayment.entity';
import { User } from './user.entity';

@Entity()
export class PurchaseOrder extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    invoiceNumber?: string;
    @Column()
    inputedinvoiceNumber?: string;
    
    @Column()
    totalcostprice?
    : number;
    @Column()
    transactionstatusId: number;
    @Column()
    doctypeId: number;
    @Column()
    dueDate: Date;

    @Column()
    postingTypeId: number;
    
    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.purchaseorder)
    @JoinColumn()
    businesslocation: BusinessLocation;

    @ManyToOne(type => BusinessLocation, shipbusinesslocation => shipbusinesslocation.purchaseorder)
    @JoinColumn()
    shipbusinesslocation: BusinessLocation;

    @ManyToOne(type => Supplier, supplier => supplier.purchaseorder)
    supplier: Supplier;

    
    @ManyToOne(type => FiscalYear, fiscalyear => fiscalyear.purchaseorders)
    fiscalyear?: FiscalYear;

    @ManyToOne(type => PurchaseOrderPayment, orderpayment => orderpayment.purchaseorder)
    orderpayment?: PurchaseOrderPayment[];

    @OneToMany(type => OrderItem, orderitem => orderitem.purchaseorder)
    orderitem?: OrderItem[];

    @Column()
    isconfirmed: boolean;

    @ManyToOne(type => User)
    confirmedby?: User;

    @ManyToOne(() => Business, business => business.purchaseorders)
    @JoinColumn()
    business: Business;

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
