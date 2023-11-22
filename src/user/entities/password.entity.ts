import { IsEmail } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => Users, (user) => user.password)
  user_id: Users;
}
