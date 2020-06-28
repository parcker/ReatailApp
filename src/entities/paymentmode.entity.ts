import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Business } from './business.entity';

@Entity()
export class PaymentMode extends BaseEntityClass {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Business, business => business.paymentmodes)
    @JoinColumn()
    business: Business;

}