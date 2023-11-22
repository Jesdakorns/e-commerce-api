import { ProductType } from 'src/product-type/entities/product-type.entity';
import { Users } from 'src/user/entities';
import { Remove } from 'src/user/entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Index,
} from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  @Index()
  title: string;

  @Column({ nullable: true })
  @Index()
  description: string;

  @Column()
  @Index()
  price: number;

  @Column({ default: 0 })
  @Index()
  stock_quantity: number;

  @Column({ default: 0 })
  @Index()
  sales_amount: number;

  @Column('json', { nullable: true })
  product_review: {
    rating: number;
    description: string;
  };

  @Column({ type: 'enum', enum: Remove, nullable: true, default: Remove.FALSE })
  remove: Remove;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @OneToOne(() => ProductType, (productType) => productType.id)
  type_id: ProductType;

  @OneToOne(() => Users, (user) => user.id)
  user_id: Users;
}
