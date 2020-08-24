import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, BeforeInsert } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Supplier } from './partner.entity';
import { Business, BusinessLocation } from './business.entity';
import { Product } from './product.entity';
import { FiscalYear } from './fiscalyear.entity';
import { PurchaseOrderPayment } from './purchaseorderpayment.entity';
import { User } from './user.entity';
import { Warehouse } from './warehouse.entity';

@Entity()
export class PurchaseOrder extends BaseEntityClass {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    invoiceNumber: string;

    @Column({ nullable: true })
    inputedinvoiceNumber?: string;

    @Column({ nullable: true,type: "decimal" })
    totalcostprice?: number;

    @Column()
    transactionstatusId: number;

    @Column({ nullable: true})
    transactionstatus: string;

    @Column({ nullable: true})
    comments?: string;

    @Column()
    doctypeId: number;

    @Column()
    dueDate: Date;

    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.purchaseorder, { cascade: true })
    @JoinColumn()
    raisedlocation: BusinessLocation;
 
    @ManyToOne(type => BusinessLocation, shipbusinesslocation => shipbusinesslocation.purchaseorder, { cascade: true, })
    @JoinColumn()
    shipbusinesslocation: BusinessLocation;

    @ManyToOne(type => Warehouse,{ cascade: true})
    @JoinColumn()
    warehouse: Warehouse;

    @ManyToOne(type => Supplier, supplier => supplier.purchaseorder, { cascade: true })
    supplier: Supplier;
 
    @ManyToOne(type => FiscalYear, fiscalyear => fiscalyear.purchaseorders, { cascade: true })
    fiscalyear?: FiscalYear;

    @ManyToOne(type => PurchaseOrderPayment, orderpayment => orderpayment.purchaseorder, { cascade: true })
    orderpayment?: PurchaseOrderPayment[];

    @OneToMany(type => OrderItem, orderitem => orderitem.purchaseorder, { cascade: true })
    orderitem?: OrderItem[];

    @ManyToOne(() => Business, business => business.purchaseorders, { cascade: true })
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
    ctnqty: number;

    @Column()
    unitqty: number;

    @Column({ type: "decimal" ,default:0.00 })
    retailcost: number;

    @Column({ type: "decimal",default:0.00  })
    wholesalecost: number;
    
    @Column({ type: "decimal",default:0.00 })
    unitprice: number;

    @Column({ type: "decimal",default:0.00  })
    wholesaleprice: number;

    @Column({ type: "decimal",default:0.00  })
    linetotalretailCost: number;

    @Column({ type: "decimal",default:0.00  })
    linetotalwholesaleCost: number;


    @ManyToOne(type => PurchaseOrder, purchaseorder => purchaseorder.orderitem)
    purchaseorder: PurchaseOrder;


}
