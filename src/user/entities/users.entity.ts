import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  // JoinColumn,
  Index,
  // ManyToOne,
  // OneToMany,
} from 'typeorm';
import { Passwords } from '.';
// import { ProductOrder } from '@/src/order/entities/productOrder.entity';
// import { ProductReview, Products } from '@/src/product/entities';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Remove {
  FALSE = 'false',
  TRUE = 'true',
}

export enum Provider {
  GOOGLE = 'google',
  DEFAULT = 'default',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  birthday?: Date;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'enum', enum: Gender, nullable: true, default: null })
  gender?: Gender;

  @Column({ length: 10, nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: Provider,
    default: Provider.DEFAULT,
  })
  provider?: Provider;

  @OneToOne(() => Passwords, (password) => password.userId, { cascade: true })
  password: Passwords;

  // @OneToMany(() => ProductOrder, (order) => order.customer)
  // productOrder: ProductOrder[];

  // @OneToMany(() => ProductReview, (review) => review.user)
  // review: ProductReview[];

  // @OneToMany(() => Products, (product) => product.user)
  // product: Products[];

  @Column({ type: 'bool', default: false })
  @Index()
  remove: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}
