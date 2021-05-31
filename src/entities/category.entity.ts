import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, BeforeInsert} from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { BusinessLocation, Business } from './business.entity';
import { Product } from './product.entity';
@Entity()
export class Category extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
   
    name:string;

    @ManyToOne(() => Business, business => business.category)
    @JoinColumn()
    business: Business;

    @OneToMany(() => SubCategory, subcategory => subcategory.category)
    subcategory: SubCategory[];

    @OneToMany(() => Product, product => product.category)
    product: Product[];


}

@Entity()
export class SubCategory extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
   
    name:string;

    @ManyToOne(() => Category, category => category.subcategory,{onDelete:'CASCADE'})
    @JoinColumn()
    category: Category;

    // @ManyToOne(() => Business, business => business.subcategory,{onDelete:'CASCADE'})
    // @JoinColumn()
    // business: Business;

    
    @OneToMany(() => Product, product => product.subCategory)
    product: Product[];
     
}