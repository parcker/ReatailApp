import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, Index} from 'typeorm';



@Entity()
export class UnitOfStock {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    name: string;
}