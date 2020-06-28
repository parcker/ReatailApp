import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Business } from './business.entity';

@Entity()
export class PaymentTerm extends BaseEntityClass {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Business, business => business.paymentterms)
    @JoinColumn()
    business: Business;

    @Column()
    noofdays: number;
}