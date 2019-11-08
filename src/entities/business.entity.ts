import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseEntityClass } from './base.entity';
import { User } from './user.entity';
import { Role } from './role.entity';
import { Category, SubCategory } from './category.entity';

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
    
    @OneToMany(type => BusinessLocation, businessLocation => businessLocation.business)
    businessLocation: BusinessLocation[];

    @OneToOne(() => User, (user: User) => user.business)
    public user: User;

    @OneToMany(type => Role, roles => roles.business)
    roles: Role[];

  
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

    @ManyToOne(type => Business, business => business.businessLocation)
    @JoinColumn()
    business: Business;

    @Column()
    @IsNotEmpty()
    public createdby: string;
    
    @Column()
    @IsOptional()
    public updatedby: string;

    
    @OneToMany(type => Category, category => category.businesslocation)
    category: Category[];

    @OneToMany(type => SubCategory, subcategory => subcategory.businesslocation)
    subcategory: SubCategory[];
  
}

