import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, Index } from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Category, SubCategory } from './category.entity';
import { Business } from './business.entity';
import { Order, OrderItem } from './order.entity';
import { StockCard } from './stockcard.entity';
import { StoreProduct } from './storeproduct.entity';
import { ProductConfiguration } from './productconfiguration.entity';
import { PriceConfiguration } from './priceconfiguration.entity';

@Entity()
export class Product extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index()
    @Column()
    public name: string;

    @Index()
    @Column()
    public itemcode: string;
    @Column()
    public description: string;

    @Column()
    public imagelink: string;
    @Index()
    @ManyToOne(type => Category, category => category.product)
    @JoinColumn()
    category: Category;

    @ManyToOne(type => SubCategory, subcategory => subcategory.product)
    @JoinColumn()
    subCategory: SubCategory;

    @Index()
    @ManyToOne(() => Business, business => business.category)
    @JoinColumn()
    business: Business;

    @OneToMany(type => OrderItem, orderitem => orderitem.product)
    @JoinColumn()
    orderitem: OrderItem[];

    @OneToMany(type => StockCard, stockcard => stockcard.product)
    stockcard: StockCard[];

    @OneToMany(type => StoreProduct, storeproduct => storeproduct.product)
    @JoinColumn()
    storeproduct: StoreProduct[];

    @OneToOne(type => ProductConfiguration,{onDelete:'CASCADE'})
    @JoinColumn()
    productconfiguration: ProductConfiguration;

    @OneToMany(type => PriceConfiguration, priceconfiguration => priceconfiguration.product)
    @JoinColumn()
    priceconfiguration: PriceConfiguration[];

}

