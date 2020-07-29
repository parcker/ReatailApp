import { PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, Index, Entity, OneToOne } from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Tax } from './tax.entity';
@Entity()
export class PriceConfiguration extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    qty: number;
    @Column()
    price: number;
    @Column()
    ispromo: boolean;
    @Column()
    start: Date;
    @Column()
    end: Date;
    @Column()
    extracolum: number;
    @Index()
    @ManyToOne(() => Product, product => product.priceconfiguration)
    @JoinColumn()
    product: Product;

    // @Index()
    // @OneToOne(() => Product, product => product.priceconfiguration)
    // @JoinColumn()
    // product: Product;

}
