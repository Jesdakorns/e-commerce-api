import { Users } from '@/src/user/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { Products } from '../../product/entities/products.entity';

@Entity()
export class ProductOrder {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ default: 1 })
  @Index()
  salesAmount: number;

  @Column({ default: 0, nullable: true })
  @Index()
  discount: number;

  @ManyToOne(() => Products, (product) => product.order, { nullable: false })
  @Index()
  product: Products;

  @ManyToOne(() => Users, (user) => user.productOrder, { nullable: false })
  @Index()
  customer: Users;

  @Column({ type: 'bool', default: false })
  @Index()
  statusBuy: boolean;

  @Column({ type: 'bool', default: false })
  remove: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @Column({ nullable: true })
  sellAt: Date;
}
