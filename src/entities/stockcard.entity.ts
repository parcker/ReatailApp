import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, Index} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Business, BusinessLocation } from './business.entity';

@Entity()
export class StockCard extends BaseEntityClass {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Index()
    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.stockcard)
    @JoinColumn()
    businesslocation: BusinessLocation;

    @Index()
    @ManyToOne(type => Product, product => product.stockcard)
    @JoinColumn()
    product: Product;

    @Column()
    StockMovementDescription:string;

    @Index()
    @Column()
    Direction:number;
    
    @Index()
    @Column()
    Quantity:number;
}