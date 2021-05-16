import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, BeforeInsert} from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { BusinessLocation, Business } from './business.entity';
import { Role } from './role.entity';
import { User } from './user.entity';



@Entity()
export class MerchantRole extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name:string;
    
    @JoinColumn()
    business: Business;
    
}

@Entity()
export class MerchantRoleUser extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name:string;
    
    @JoinColumn()
    business: Business;

    @JoinColumn()
    merchantuser: User;

    @JoinColumn()
    merchantrole: MerchantRole;

   

    
}

@Entity()
export class MerchantModule extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name:string;
    
    @JoinColumn()
    business: Business;
    
}

@Entity()
export class MerchantPermission extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name:string;
    @JoinColumn()
    module: MerchantModule;

    @JoinColumn()
    role: Role;
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

