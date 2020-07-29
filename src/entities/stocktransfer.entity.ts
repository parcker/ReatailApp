import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, Index} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Business, BusinessLocation } from './business.entity';

@Entity()
export class StockTransfer extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Index()
    @Column()
    transfertype:number;

    // @Index()
    // @ManyToOne(type => BusinessLocation, businesslocationFrom => businesslocationFrom.storeproduct)
    // @JoinColumn()
    // businesslocationFrom: BusinessLocation;

    // @Index()
    // @ManyToOne(type => BusinessLocation, businesslocationTo => businesslocationTo.storeproduct)
    // @JoinColumn()
    // businesslocationTo: BusinessLocation;
}