import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Business, BusinessLocation } from './business.entity';

@Entity()
export class StockCard extends BaseEntityClass {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.order)
    @JoinColumn()
    businesslocation: BusinessLocation;

    @ManyToOne(type => Product, product => product.orderitem)
    @JoinColumn()
    product: Product;

    @Column()
    StockMovementDescription:string;
    @Column()
    Direction:number;

}