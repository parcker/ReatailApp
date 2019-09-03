import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, QueryFailedError, BaseEntity} from 'typeorm';
import {IsEmail, IsNotEmpty, Validator} from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity
{
    private static DEFAULT_SALT_ROUNDS = 10;

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @IsNotEmpty()
    public email: string;

    @Column()
    @IsNotEmpty()
    public password: string;

    @Column()
    @IsNotEmpty()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public age: number;

    @Column()
    public isDisabled: boolean;
    
    @Column()
    @IsNotEmpty()
    public phonenumber: string;
    
    public toJSON() {
        return {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
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
