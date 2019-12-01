import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {IsNotEmpty, IsBoolean} from 'class-validator';
import { BaseEntityClass } from './base.entity';
import { Category, SubCategory } from './category.entity';
import { Business } from './business.entity';

@Entity()
export class Product extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()

    @IsNotEmpty()
    public name: string;
    @Column()
    @IsNotEmpty()
    public itemcode: string;
    @Column()
    @IsNotEmpty()
    public description: string;
    @Column()
    @IsNotEmpty()
    public packingtype: string;
    @Column()
    @IsNotEmpty()
    public packs: number;
    @Column()
    @IsBoolean()
    public expiredenabled: boolean;

    @ManyToOne(type => Category, category => category.product)
    @JoinColumn()
    category: Category;

    @ManyToOne(type => SubCategory, subcategory => subcategory.product)
    @JoinColumn()
    subCategory: SubCategory;

    @ManyToOne(() => Business, business => business.category)
    @JoinColumn()
    business: Business;

}

@Entity()
export class Stock extends BaseEntityClass {

    
}
