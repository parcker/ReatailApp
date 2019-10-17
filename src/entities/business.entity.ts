import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseEntityClass } from './base.entity';

@Entity()
export class Business extends BaseEntityClass {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    public name: string;

    @Column()
    @IsNotEmpty()
    public address: string;

    @Column()
    @IsOptional()
    public logoPath: string;
    
    @Column()
    @IsNotEmpty()
    public IsActive: boolean;
  
}
@Entity()
export class BusinessLocation extends BaseEntityClass {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    public name: string;

    @Column()
    @IsNotEmpty()
    public address: string;
    
    @Column()
    @IsNotEmpty()
    public IsActive: boolean;

    @OneToOne(() => Business)
    @JoinColumn()
    business: Business;

    @Column()
    @IsNotEmpty()
    public createdby: string;
    
    @Column()
    @IsOptional()
    public updatedby: string;
  
}

