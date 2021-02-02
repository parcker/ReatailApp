import {Entity, PrimaryGeneratedColumn, Column, Index} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { TransferStatus, TransferType } from '../enums/settings.enum';

@Entity()
export class StockTransfer extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Index()
    @Column()
    transfertype:TransferType;

    @Column({default:""})
    note:string;

    @Column({default:TransferStatus.New})
    public status:TransferStatus

}