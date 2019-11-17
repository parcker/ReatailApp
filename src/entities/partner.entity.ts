import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import { BaseEntityClass } from './base.entity';
import { Business } from './business.entity';

@Entity()
export class Customer extends BaseEntityClass{

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    @IsNotEmpty()
    fullname:string;
    @ManyToOne(() => Business, business => business.customer)
    @JoinColumn()
    business: Business;
    @Column()
    @IsNotEmpty()
    mobilenumber:string;
    @Column()
    email:string;
    @Column()
    gender:number;
    @Column()
    age:number;
    @Column()
    birthday:number;
    @Column()
    birthmonth:string;
}
@Entity()
export class Supplier extends BaseEntityClass{

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    @IsNotEmpty()
    companyname:string;
    @ManyToOne(() => Business, business => business.supplier)
    @JoinColumn()
    business: Business;
    @Column()
    @IsNotEmpty()
    mobilenumber:string;
   
    @Column()
    @IsNotEmpty()
    email:string;

    @Column()
    @IsNotEmpty()
    address:string;

    
}