import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, OneToMany, ManyToOne } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { User } from './user.entity';
import { Role } from './role.entity';
import { Category, SubCategory } from './category.entity';
import { Customer, Supplier } from './partner.entity';
import {PurchaseOrder } from './order.entity';
import { StockCard } from './stockcard.entity';
import { StoreProduct } from './storeproduct.entity';
import { StockTransfer } from './stocktransfer.entity';
import { FiscalYear } from './fiscalyear.entity';
import { PaymentMode } from './paymentmode.entity';
import { PaymentTerm } from './paymentterm.entity';

@Entity()
export class Business extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    public name: string;
    @Column()
    public address: string;
    @Column()
    public logoPath: string;
    
    @OneToMany(type => BusinessLocation, businessLocation => businessLocation.business)
    businessLocation: BusinessLocation[];

    @OneToOne(() => User, (user: User) => user.business)
    public user: User;

    @OneToMany(type => Role, roles => roles.business)
    roles: Role[];

    @OneToMany(type => Category, category => category.business)
    category: Category[];

    @OneToMany(type => SubCategory, subcategory => subcategory.business)
    subcategory: SubCategory[];
    
    @OneToMany(type => Supplier, suppliers => suppliers.business)
    suppliers: Supplier[];

    @OneToMany(type => FiscalYear, fiscalyear => fiscalyear.business)
    fiscalyear: FiscalYear[];

    
    @OneToMany(type => PaymentMode, paymentmodes => paymentmodes.business)
    paymentmodes: PaymentMode[];

    @OneToMany(type => PaymentTerm, paymentmodes => paymentmodes.business)
    paymentterms: PaymentTerm[];

    @OneToMany(type => PurchaseOrder, purchaseorders => purchaseorders.business)
    purchaseorders: PurchaseOrder[];

}
@Entity()
export class BusinessLocation extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    public name: string;
    @Column()
    public address: string;
    @ManyToOne(type => Business, business => business.businessLocation)
    @JoinColumn()
    business: Business;
   
    @OneToMany(type => PurchaseOrder, purchaseorder => purchaseorder.businesslocation)
    purchaseorder: PurchaseOrder[];
    @OneToMany(type => StockCard, stockcard => stockcard.businesslocation)
    stockcard: StockCard[];
    // @OneToMany(type => Customer, customer => customer.businesslocation)
    // customer: Customer[];
    // @OneToMany(type => Supplier, supplier => supplier.business)
    // supplier: Supplier[];

    @OneToMany(type => StoreProduct, storeproduct => storeproduct.businesslocation)
    storeproduct: StoreProduct[];


    @OneToMany(type => StockTransfer, stocktransfer => stocktransfer.businesslocationFrom)
    stocktransferFrom: StockTransfer[];

    @OneToMany(type => StockTransfer, stocktransfer => stocktransfer.businesslocationTo)
    stocktransferTo: StockTransfer[];

}

