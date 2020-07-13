import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, BeforeInsert } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Supplier } from './partner.entity';
import { Business, BusinessLocation } from './business.entity';
import { Product } from './product.entity';
import { FiscalYear } from './fiscalyear.entity';
import { PurchaseOrderPayment } from './purchaseorderpayment.entity';
import { User } from './user.entity';

@Entity()
export class PurchaseOrder extends BaseEntityClass {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    invoiceNumber: string;

    @Column({ nullable: true })
    inputedinvoiceNumber?: string;

    @Column({ nullable: true })
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

    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.purchaseorder, { cascade: true })
    @JoinColumn()
    businesslocation: BusinessLocation;

    @ManyToOne(type => BusinessLocation, shipbusinesslocation => shipbusinesslocation.purchaseorder, { cascade: true, })
    @JoinColumn()
    shipbusinesslocation: BusinessLocation;

    @ManyToOne(type => Supplier, supplier => supplier.purchaseorder, { cascade: true })
    supplier: Supplier;

    // @BeforeInsert()
    // private async updateinvoiceNumber() {
    //     this.invoiceNumber = await bcrypt.hash(this.password, User.DEFAULT_SALT_ROUNDS);

    // }


    @ManyToOne(type => FiscalYear, fiscalyear => fiscalyear.purchaseorders, { cascade: true })
    fiscalyear?: FiscalYear;

    @ManyToOne(type => PurchaseOrderPayment, orderpayment => orderpayment.purchaseorder, { cascade: true })
    orderpayment?: PurchaseOrderPayment[];

    @OneToMany(type => OrderItem, orderitem => orderitem.purchaseorder, { cascade: true })
    orderitem?: OrderItem[];

    @Column()
    isconfirmed: boolean;

    @ManyToOne(type => User)
    confirmedby?: User;

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
    qty: number;
    @Column({ type: "decimal" })
    cost: number;
    @Column({ type: "decimal" })
    unitprice: number;
    @Column()
    previousqty: number;
    @ManyToOne(type => PurchaseOrder, purchaseorder => purchaseorder.orderitem)
    purchaseorder: PurchaseOrder;


}
