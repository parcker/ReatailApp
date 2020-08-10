import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, Index} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Business, BusinessLocation } from './business.entity';
import { Customer } from './partner.entity';
import { SalesLevel, SalesType } from '../enums/settings.enum';
import { Sales } from './sales.entity';
import { Warehouse } from './warehouse.entity';


@Entity()
export class SalesItems extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index()
    @ManyToOne(type => Product, product => product.saleitem)
    product: Product;

    @Index()
    @Column()
    public warehouseId: string;

    @Index()
    @Column()
    public businesslocationId: string;

    @Column()
    public taxValue: number;

    @Column()
    public tax: number;

    @Column()
    public unitQty: number;

    @Column()
    public ctnQty: number;

    @Column()
    public price: number;

    @Column()
    public lineamount: number;

    
    @ManyToOne(type => Sales, saledetail => saledetail.saleitem,{cascade:true})
    saledetail: Sales;

}