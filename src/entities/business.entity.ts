import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseEntityClass } from './base.entity';
import { User } from './user.entity';
import { Role } from './role.entity';
import { Category, SubCategory } from './category.entity';
import { Customer, Supplier } from './partner.entity';

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

    @OneToMany(type => Category, category => category.business)
    category: Category[];

    @OneToMany(type => SubCategory, subcategory => subcategory.business)
    subcategory: SubCategory[];

    @OneToMany(type => Customer, customer => customer.business)
    customer: Customer[];

    @OneToMany(type => Supplier, supplier => supplier.business)
    supplier: Supplier[];

  
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

    @OneToMany(type => BusinessLocationUser, businesslocationuser => businesslocationuser.businesslocation)
    businesslocationuser: BusinessLocationUser[];
  
}
@Entity()
export class BusinessLocationUser extends BaseEntityClass {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    
    @ManyToOne(type => BusinessLocation, businesslocation => businesslocation.businesslocationuser)
    @JoinColumn()
    businesslocation: BusinessLocation;

    @ManyToOne(() => User, user => user.businesslocationuser)
    @JoinColumn()
    user: User;
  
}

