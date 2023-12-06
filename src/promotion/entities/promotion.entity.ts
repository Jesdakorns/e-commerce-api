import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

export enum ESelect {
  FALSE = 'false',
  TRUE = 'true',
}

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ nullable: true })
  @Index()
  url: string;

  @Column()
  image: string;

  @Column({ type: 'bool', default: false })
  @Index()
  isSelect: boolean;

  @Column({ type: 'bool', default: false })
  @Index()
  remove: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}

@Entity()
export class PromotionSub {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ nullable: true })
  @Index()
  url: string;

  @Column()
  image: string;

  @Column({ type: 'bool', default: false })
  @Index()
  isSelect: boolean;

  @Column({ type: 'bool', default: false })
  @Index()
  remove: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}
