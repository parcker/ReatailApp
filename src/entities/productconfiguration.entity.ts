import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
@Entity()
export class ProductConfiguration extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    pack: number;
    @Column()
    leadtime: number;
    @Column()
    public canexpire: boolean;
    @Column()
    public canbesold: boolean;
    @Column()
    public canbepurchased: boolean;
    @Column()
    public anypromo: boolean;

    // @Index()
    // @OneToOne(type => Product, product => product.productconfiguration,{onDelete:'CASCADE'})
    // @JoinColumn()
    // product: Product;
}