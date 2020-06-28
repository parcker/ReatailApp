import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { PurchaseOrder } from './order.entity';

@Entity()
export class PurchaseOrderPayment extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => PurchaseOrder, purchaseorder => purchaseorder.orderpayment)
    @JoinColumn()
    purchaseorder: PurchaseOrder;

    @Column()

    paymenttype: string;

    @Column()

    paymentdate: string;

    @Column()

    amountpaid: number;

    @Column()

    balnce: number;

}