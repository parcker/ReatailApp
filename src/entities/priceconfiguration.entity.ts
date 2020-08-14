import { PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, Index, Entity, OneToOne } from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Tax } from './tax.entity';
import { Business } from './business.entity';
@Entity()
export class PriceConfiguration extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type:"decimal",default:0.00})
    markup: number;

    @Column({type:"decimal",default:0.00})
    unitcostprice: number;

    @Column({type:"decimal",default:0.00})
    retailsellingprice: number;

    @Column({type:"decimal",default:0.00})
    wholesalecostprice: number;

    @Column({type:"decimal",default:0.00})
    wholesalesellingprice: number;

    @Column({default:false})
    anyretaildiscount: boolean;

    @Column({default:false})
    anywholediscount: boolean;

    @Column({default:0})
    discountype: number;

    @Column({type:"decimal",default:0.00})
    retaildiscountvalue: number;
   
    @Column({type:"decimal",default:0.00})
    wholesalediscountvalue: number;

    @Index()
    @ManyToOne(() => Product, product => product.priceconfiguration)
    @JoinColumn()
    product: Product;

    @Column({default:true})
    Active:boolean;


}
