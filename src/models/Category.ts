import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Transaction from './Transaction';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('timestamp with time zone')
  created_at: Date;

  @Column('timestamp with time zone')
  updated_at: Date;

  @OneToMany(type => Transaction, transaction => transaction.categoryId)
  transaction: Transaction[];
}

export default Category;
