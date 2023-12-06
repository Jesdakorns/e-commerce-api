import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Index,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Passwords {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  @Index()
  password: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @OneToOne(() => Users, (user) => user.password)
  userId: Users;
}
