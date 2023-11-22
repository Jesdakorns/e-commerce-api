import { IsEmail } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Passwords } from '.';

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

  @Column()
  @IsEmail()
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

  @Column({ type: 'enum', enum: Remove, nullable: true, default: Remove.FALSE })
  remove: Remove;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => Passwords, (password) => password.user_id, { cascade: true })
  @JoinColumn()
  password: Passwords;
}
