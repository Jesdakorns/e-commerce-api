import { ProductType } from '@/src/product-type/entities/product-type.entity';
import { Users } from '@/src/user/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductOrder } from '../../order/entities/productOrder.entity';
import { ProductReview } from './productReview.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  @Index()
  title: string;

  @Column('text', { nullable: true })
  @Index()
  description: string;

  @Column()
  @Index()
  price: number;

  @Column('text', { array: true })
  coverPhoto: string[];

  @Column({ default: 0 })
  @Index()
  stockQuantity: number;

  @Column({ default: 0, nullable: true })
  @Index()
  discount: number;

  @Column({ default: 0, nullable: true })
  @Index()
  priceMinusDiscount: number;

  @Column({ default: 0 })
  @Index()
  salesAmount: number;

  @ManyToOne(() => ProductType, (productType) => productType.product, {
    nullable: false,
  })
  @Index()
  productType: ProductType;

  @ManyToOne(() => Users, (user) => user.product, {
    nullable: false,
  })
  @Index()
  user: Users;

  @OneToMany(() => ProductReview, (pr) => pr.product)
  review: ProductReview[];

  @OneToMany(() => ProductOrder, (po) => po.product)
  order: ProductOrder[];

  @Column({ type: 'bool', default: false })
  remove: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}
