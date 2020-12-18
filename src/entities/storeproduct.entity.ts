import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, Index} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Business, BusinessLocation } from './business.entity';
import { Warehouse } from './warehouse.entity';

@Entity()
export class StoreProduct  {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({default:0})
    public instockqty: number;
    @Column({default:0})
    public committedqty: number;
    @Column({default:0})
    public orderedqty: number;
    @Column({default:0})
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