import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, Index} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Business, BusinessLocation } from './business.entity';

@Entity()
export class StoreProduct  {

    @PrimaryGeneratedColumn("uuid")
    id: string;
   

    @Index()
    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.storeproduct)
    @JoinColumn()
    businesslocation: BusinessLocation;

    @Index()
    @ManyToOne(type => Product, product => product.storeproduct)
    @JoinColumn()
    product: Product;
   
}