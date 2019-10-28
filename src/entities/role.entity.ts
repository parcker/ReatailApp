import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import { BaseEntityClass } from './base.entity';
import { User } from './user.entity';
import { Business } from './business.entity';
@Entity()
export class Role extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    public name: string;
  
    @ManyToOne(type => Business, business => business.roles)
    @JoinColumn()
    business: Business;
}

@Entity()
export class RoleUser extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToOne(() => Role)
    @JoinColumn()
    role: Role;


}

@Entity()
export class ApplicationRoute extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    @IsNotEmpty()
    url:string;
    @Column()
    @IsNotEmpty()
    description:string;
    @Column()
    @IsNotEmpty()
    type:number;

    @OneToMany(type => UserPremission, userpermission => userpermission.applicationroute)
    userpermission: UserPremission[];

    

}

@Entity()
export class UserPremission extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ManyToOne(type => ApplicationRoute, applicationroute => applicationroute.userpermission,{
        cascade: true,
        eager: true,
    })
    applicationroute: ApplicationRoute;
    
    @ManyToOne(type => User, user => user.userpermission)
    user: User;
}

