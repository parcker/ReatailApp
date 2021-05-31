import { Options } from '@nestjs/common';
import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne, JoinTable} from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Business } from './business.entity';
import { User } from './user.entity';



@Entity()
export class MerchantRole extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name:string;

  
    @ManyToOne(() => Business,business => business.merchantroles,{nullable: false})
    @JoinColumn({name:'businessId'})
    business: Business;
  

    
}

@Entity()
export class MerchantRoleUser extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(type => Business)
    @JoinColumn()
    business: Business;

    @ManyToOne(type => User)
    @JoinColumn()
    merchantuser: User;

    @ManyToOne(type => MerchantRole)
    @JoinColumn()
    merchantrole: MerchantRole;

    
}

@Entity()
export class MerchantModule extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name:string;
    @ManyToOne(type => Business)
    @JoinColumn()
    business: Business;
    
}

@Entity()
export class MerchantPermission extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
   
    @ManyToOne(type => MerchantModule)
    @JoinColumn()
    module: MerchantModule;

    @ManyToOne(type => MerchantRole)
    @JoinColumn()
    role: MerchantRole;

    @ManyToOne(type => Business)
    @JoinColumn()
    business: Business;
    
    @Column()
    CanDelete:boolean;
    @Column()
    CanCreate:boolean;
    @Column()
    CanUpdate:boolean;
    @Column()
    CanView:boolean;
    @Column()
    CanApprove:boolean;
    @Column()
    CanReject:boolean;
    @Column()
    CanUpload:boolean;
    @Column()
    CanDownLoad:boolean;


    
}

