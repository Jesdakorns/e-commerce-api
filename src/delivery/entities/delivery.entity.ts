import { Users } from '@/src/user/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Products } from '../../product/entities/products.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  @Index()
  titleEn: string;

  @Column()
  @Index()
  titleTh: string;

  @Column({ type: 'bool', default: false })
  remove: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}
