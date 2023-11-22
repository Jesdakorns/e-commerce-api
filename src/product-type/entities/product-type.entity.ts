import { Remove } from 'src/user/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

export type TProductType = {
  id: number;
  title_en: string;
  title_th: string;
  image: string;
  remove: boolean;
  created_at: Date;
  updated_at: Date;
};

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  @Index()
  title_en: string;

  @Column()
  @Index()
  title_th: string;

  @Column('text')
  @Index()
  image: string;

  @Column({ type: 'enum', enum: Remove, nullable: true, default: Remove.FALSE })
  remove: Remove;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}
