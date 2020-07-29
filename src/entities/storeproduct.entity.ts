import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, Index} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Business, BusinessLocation } from './business.entity';
import { Warehouse } from './warehouse.entity';

@Entity()
export class StoreProduct  {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    public instockqty: number;
    @Column()
    public committedqty: number;
    @Column()
    public orderedqty: number;
    @Column()
    public availableqty: number;

    @Index()
    @ManyToOne(type => Warehouse,warehouse => warehouse.storproduct)
    @JoinColumn()
    warehouse: Warehouse;

    @Index()
    @ManyToOne(type => Product, product => product.storeproduct)
    @JoinColumn()
    product: Product;
   
}