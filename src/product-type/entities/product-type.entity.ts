import { Products } from '@/src/product/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';

export type TProductType = {
  id: number;
  titleEn: string;
  titleTh: string;
  image: string;
  remove: boolean;
  createdAt: Date;
  updatedAt: Date;
};

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ unique: true })
  @Index()
  titleEn: string;

  @Column({ unique: true })
  @Index()
  titleTh: string;

  @Column('text')
  @Index()
  image: string;

  @OneToMany(() => Products, (product) => product.productType)
  product: Products[];

  @Column({ type: 'bool', default: false })
  @Index()
  remove: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}
