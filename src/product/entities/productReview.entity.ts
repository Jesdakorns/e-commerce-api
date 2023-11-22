import { Users } from 'src/user/entities';
import { Remove } from 'src/user/entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Index,
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

  @Column({ type: 'enum', enum: Remove, nullable: true, default: Remove.FALSE })
  remove: Remove;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @OneToOne(() => Users, (user) => user.id)
  user_id: Users;

  @OneToOne(() => Products, (product) => product.id)
  product_id: Products;
}
