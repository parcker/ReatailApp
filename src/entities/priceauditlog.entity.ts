import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, OneToMany, ManyToOne, Index } from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { BusinessLocation, Business } from './business.entity';
import { Product } from './product.entity';
@Entity()
export class PriceAuditLog extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index()
    @Column()
    productId:string;

    @Column()
    oldpriceinfo:string;

    @Column()
    newpriceinfo:string;
  
}
