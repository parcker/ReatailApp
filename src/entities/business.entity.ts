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
    @Column()
    public createdby: string;
    @Column()
    public updatedby: string;
    @OneToMany(type => BusinessLocationUser, businesslocationuser => businesslocationuser.businesslocation)
    businesslocationuser: BusinessLocationUser[];
    @OneToMany(type => PurchaseOrder, purchaseorder => purchaseorder.businesslocation)
    purchaseorder: PurchaseOrder[];
    @OneToMany(type => StockCard, stockcard => stockcard.businesslocation)
    stockcard: StockCard[];
    @OneToMany(type => Customer, customer => customer.businesslocation)
    customer: Customer[];
    @OneToMany(type => Supplier, supplier => supplier.business)
    supplier: Supplier[];

    @OneToMany(type => StoreProduct, storeproduct => storeproduct.businesslocation)
    storeproduct: StoreProduct[];


    @OneToMany(type => StockTransfer, stocktransfer => stocktransfer.businesslocationFrom)
    stocktransferFrom: StockTransfer[];

    @OneToMany(type => StockTransfer, stocktransfer => stocktransfer.businesslocationTo)
    stocktransferTo: StockTransfer[];

}
@Entity()
export class BusinessLocationUser extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;


    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.businesslocationuser)
    @JoinColumn()
    businesslocation: BusinessLocation;

    @ManyToOne(() => User, user => user.businesslocationuser)
    @JoinColumn()
    user: User;

}

