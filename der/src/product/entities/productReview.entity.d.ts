import { Users } from 'src/user/entities';
import { Remove } from 'src/user/entities/users.entity';
import { Products } from './index';
export declare class ProductReview {
    id: number;
    rating: number;
    description: string;
    remove: Remove;
    created_at: Date;
    updated_at: Date;
    user_id: Users;
    product_id: Products;
}
