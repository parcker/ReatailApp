import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, Index} from 'typeorm';

import { BaseEntityClass } from './base.entity';
import { Category, SubCategory } from './category.entity';
import { Business } from './business.entity';
import { Order, OrderItem } from './order.entity';
import { StockCard } from './stockcard.entity';
import { StoreProduct } from './storeproduct.entity';

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

    @Column()
    public canexpire: boolean;

    @Column()
    public canbesold: boolean;

    @Column()
    public canbepurchased: boolean;

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
    orderitem: OrderItem[];
    
    @OneToMany(type => StockCard, stockcard => stockcard.product)
    stockcard: StockCard[];

    @OneToMany(type => StoreProduct, storeproduct => storeproduct.product)
    storeproduct: StoreProduct[];
    
    @OneToMany(type => ProductConfiguration, productconfiguration => productconfiguration.product)
    productconfiguration: ProductConfiguration[];

}

export class ProductConfiguration{

    @PrimaryGeneratedColumn("uuid")
    id: string;
   
    @Column({ type: "simple-json" })
    unitofmessures: {
        id: string;
        quantity: number;
    };
    @Column()
    leadtime: number;
    @Index()
    @ManyToOne(type => Product, product => product.productconfiguration)
    @JoinColumn()
    product: Product;
}
export class UnitOfStock{

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
   
}
