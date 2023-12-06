import { Users } from '@/src/user/entities';
import { Products } from './index';
export declare class ProductReview {
    id: number;
    rating: number;
    description: string;
    remove: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: Users;
    product: Products;
}
