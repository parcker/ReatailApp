import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import { BaseEntityClass } from './base.entity';
import {RoleDto} from '../app-Dto/usermgr/role/role.dto'
@Entity()
export class Role extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    public name: string;
}