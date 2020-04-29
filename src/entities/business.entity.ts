import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, OneToMany, ManyToOne } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { User } from './user.entity';
import { Role } from './role.entity';
import { Category, SubCategory } from './category.entity';
import { Customer, Supplier } from './partner.entity';
import { Order } from './order.entity';

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
    
    @Column()
   
    public IsActive: boolean;
    
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

    @OneToMany(type => Customer, customer => customer.business)
    customer: Customer[];

    @OneToMany(type => Supplier, supplier => supplier.business)
    supplier: Supplier[];

    @OneToMany(type => Order, order => order.business)
    order: Order[];

  
}
@Entity()
export class BusinessLocation extends BaseEntityClass {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
   
    public name: string;

    @Column()
   
    public address: string;
    
    @Column()
   
    public IsActive: boolean;

    @ManyToOne(type => Business, business => business.businessLocation)
    @JoinColumn()
    business: Business;

    @Column()
   
    public createdby: string;
    
    @Column()
    
    public updatedby: string;

    @OneToMany(type => BusinessLocationUser, businesslocationuser => businesslocationuser.businesslocation)
    businesslocationuser: BusinessLocationUser[];

    @OneToMany(type => Order, order => order.businesslocation)
    order: Order[];
  
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

