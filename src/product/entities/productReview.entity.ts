import { Users } from '@/src/user/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Index,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Products } from './index';

@Entity()
export class ProductReview {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  @Index()
  rating: number;

  @Column()
  @Index()
  description: string;

  @Column({ type: 'bool', default: false })
  remove: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.review)
  user: Users;

  @ManyToOne(() => Products, (product) => product.review)
  product: Products;
}
