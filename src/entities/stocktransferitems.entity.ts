import {Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { TransferItemStatus, TransferType } from '../enums/settings.enum';
import { Product } from './product.entity';
import { StockTransfer } from './stocktransfer.entity';

@Entity()
export class StockTransferItems extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index()
    @ManyToOne(type => Product, product => product.saleitem)
    product: Product;

    @Index()
    @Column()
    public warehouseId: string;

    @Column({default:0})
    public qty: number;

    @Column({default:0})
    public approvedqty: number;
    
    @Column({default:TransferItemStatus.Pending})
    public itemStatus:TransferItemStatus

     
    @ManyToOne(type => StockTransfer, stockTransferdetail => stockTransferdetail.stockitems,{cascade:true})
    stockTransferdetail: StockTransfer;

}