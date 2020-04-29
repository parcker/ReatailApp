import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Category, SubCategory } from './category.entity';
import { Business } from './business.entity';
import { Order, OrderItem } from './order.entity';

@Entity()
export class Product extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()

   
    public name: string;
    @Column()
   
    public itemcode: string;
    @Column()
   
    public description: string;
    @Column()
   
    public packingtype: string;
    @Column()
   
    public packs: number;

    @Column()
    
    public expiredenabled: boolean;

    @Column()
  
    
    public haspricebench: boolean;


    @ManyToOne(type => Category, category => category.product)
    @JoinColumn()
    category: Category;

    @ManyToOne(type => SubCategory, subcategory => subcategory.product)
    @JoinColumn()
    subCategory: SubCategory;

    @ManyToOne(() => Business, business => business.category)
    @JoinColumn()
    business: Business;

    @OneToMany(type => OrderItem, orderitem => orderitem.product)
    orderitem: OrderItem[];

}

@Entity()
export class Stock extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
}
