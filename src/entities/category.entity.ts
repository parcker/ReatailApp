import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import { BaseEntityClass } from './base.entity';
import { BusinessLocation, Business } from './business.entity';
@Entity()
export class Category extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    @IsNotEmpty()
    name:string;
    @ManyToOne(() => Business, business => business.category)
    @JoinColumn()
    business: Business;

    @OneToMany(() => SubCategory, subcategory => subcategory.category)
    subcategory: SubCategory[];
}

@Entity()
export class SubCategory extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    @IsNotEmpty()
    name:string;

    @ManyToOne(() => Category, category => category.subcategory)
    @JoinColumn()
    category: Category;

    @ManyToOne(() => Business, business => business.category)
    @JoinColumn()
    business: Business;
     
}