import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, Index} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { Product } from './product.entity';
import { Business, BusinessLocation } from './business.entity';
import { Customer } from './partner.entity';
import { SalesLevel, SalesType } from '../enums/settings.enum';
import { SalesItems } from './salesitems.entity';


@Entity()
export class Sales extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Index()
    @ManyToOne(type => Customer, customer => customer.sales)
    @JoinColumn()
    customer: Customer;

    @Index()
    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.stockcard)
    @JoinColumn()
    businesslocation: BusinessLocation;
    
    @Index()
    @Column({nullable: true })
    paymenttermId:string

    @Column()
    transactionstatusId: number;

    @Column()
    doctypeId: number;
    
    @OneToMany(type => SalesItems, saleitem => saleitem.saledetail)
    saleitem: SalesItems[];

    @Column({nullable: true })
    additionalinfo?: string;
   
    @Column()
    deliveryDate: Date;

    @Column({type:"decimal"})
    total: Number;

    @Column({type:"decimal"})
    subTotal: Number;

    @Column({type:"decimal"})
    taxTotal: Number;

    @Column({type:"decimal"})
    totalcharges: Number;

    @Column({nullable: true })
    chargesinfo?: string;

    @Column({default:SalesLevel.SaleOrder}) ///
    level: Number;

    @Column({default:SalesType.Wholesale}) ///
    type: Number;
}
