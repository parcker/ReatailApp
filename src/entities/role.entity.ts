import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import { BaseEntityClass } from './base.entity';
import { User } from './user.entity';
@Entity()
export class Role extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    public name: string;
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