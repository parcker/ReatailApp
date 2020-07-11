import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, QueryFailedError, BaseEntity, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Business, BusinessLocation } from './business.entity';
import { UserPremission, ApplicationRoute } from './role.entity';
import { BaseEntityClass } from './base.entity';
import { UserType } from '../enums/settings.enum';


@Entity('users')
export class User extends BaseEntityClass {
    private static DEFAULT_SALT_ROUNDS = 10;

    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column({ length: "300" })
    public username: string;
    @Column({ length: "100" })
    public email: string;
    @Column({default: false})
    public emailConfirmed: boolean;
    @Column({ length: "300" })
    public password: string;
    @Column({default: false})
    public twoFactorEnable: boolean;
    @Column({default: 0})
    public accessFailedCount: number;
    @Column({default: UserType.guest})
    public userType: number;

    @Column({ length: "300" })
    public firstName: string;
    @Column()
    public lastName: string;
    @Column({ length: "300",nullable: true})
    public siguptoken?: string;
    @Column()
    public isDisabled: boolean;
    @Column({ length: "15" })
    public phonenumber: string;
    @OneToOne(() => Business, (business: Business) => business.user, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    business: Business;

    @OneToMany(type => UserPremission, userpermission => userpermission.user)
    userpermission: UserPremission[];

    @ManyToOne(type => BusinessLocation, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    businesslocation?: BusinessLocation;

    result: any;



    public toJSON() {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            phonenumber: this.phonenumber,

        }
    }


    @BeforeInsert()
    private async encryptPassword() {
        this.password = await bcrypt.hash(this.password, User.DEFAULT_SALT_ROUNDS);
       
    }

    // @BeforeInsert()
    // @BeforeUpdate()
    // private validateEmail() {
    //     const validator = new Validator();
    //     if (!validator.isEmail(this.email)) throw new QueryFailedError('', [], 'email is not a valid email');
    // }
}
