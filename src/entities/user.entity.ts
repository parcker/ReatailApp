import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, QueryFailedError, BaseEntity, OneToOne, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {IsEmail, IsNotEmpty, Validator} from 'class-validator';

import * as bcrypt from 'bcrypt';
import { Business, BusinessLocationUser } from './business.entity';
import { UserPremission, ApplicationRoute } from './role.entity';


@Entity('users')
export class User extends BaseEntity
{
    private static DEFAULT_SALT_ROUNDS = 10;

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    @IsNotEmpty()
    public username: string;

    @Column()
    @IsNotEmpty()
    public email: string;

    @Column()
    public emailConfirmed: boolean;

    @Column()
    @IsNotEmpty()
    public password: string;

    @Column()
    public twoFactorEnable: boolean;
    
    @Column()
    public accessFailedCount: number;

    @Column()
    @IsNotEmpty()
    public firstName: string;

    @Column()
    public lastName: string;
    
   
    @Column()
    public isDisabled: boolean;
    
    @Column()
    @IsNotEmpty()
    public phonenumber: string;

    @OneToOne(() => Business, (business: Business) => business.user, {
        cascade: true,
        eager: true,
      })
    @JoinColumn()
    business: Business;

    @OneToMany(type => UserPremission, userpermission => userpermission.user)
    userpermission: UserPremission[];
    
    @OneToMany(type => BusinessLocationUser, businesslocationuser => businesslocationuser.user)
    businesslocationuser: BusinessLocationUser[];
    result: any;
    

    
    public toJSON() {
        return {
            id:this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            phonenumber:this.phonenumber,

        }
    }
  

    @BeforeInsert()
    private async encryptPassword() {
        this.password = await bcrypt.hash(this.password, User.DEFAULT_SALT_ROUNDS);
        this.isDisabled=false;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private validateEmail() {
        const validator = new Validator();
        if (!validator.isEmail(this.email)) throw new QueryFailedError('', [], 'email is not a valid email');
    }
}
