import { Users } from './users.entity';
export declare class Passwords {
    id: number;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    userId: Users;
}
