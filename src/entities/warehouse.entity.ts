import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, Index} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Business, BusinessLocation } from './business.entity';
import { StoreProduct } from './storeproduct.entity';

@Entity()
export class Warehouse extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length:"200"})
    public name: string;

    @Column({length:"200"})
    public address: string;

    @Index()
    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.warehouse,{
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    businesslocation: BusinessLocation;
    
    @OneToMany(type => StoreProduct, storproduct => storproduct.warehouse,{
        cascade: true,
        eager: true,
    })
    storproduct: StoreProduct[];

    // @OneToMany(type => StockTransfer, stocktransfer => stocktransfer.businesslocationFrom)
    // stocktransferFrom: StockTransfer[];

    // @OneToMany(type => StockTransfer, stocktransfer => stocktransfer.businesslocationTo)
    // stocktransferTo: StockTransfer[];
}