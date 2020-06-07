import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, Index } from 'typeorm';

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

    @OneToMany(type => PriceConfiguration, priceconfiguration => priceconfiguration.product)
    priceconfiguration: PriceConfiguration[];

}
@Entity()
export class ProductConfiguration {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    pack: number;
    @Column()
    leadtime: number;
    @Column()
    public canexpire: boolean;
    @Column()
    public canbesold: boolean;
    @Column()
    public canbepurchased: boolean;
    @Column()
    public anypromo: boolean;

    @Index()
    @ManyToOne(type => Product, product => product.productconfiguration)
    @JoinColumn()
    product: Product;
}
@Entity()
export class PriceConfiguration extends BaseEntityClass {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    qty: number;
    @Column()
    price: number;
    @Column()
    ispromo: boolean;
    @Column()
    start: Date;
    @Column()
    end: Date;
    @Index()
    @ManyToOne(type => Product, product => product.productconfiguration)
    @JoinColumn()
    product: Product;
}
