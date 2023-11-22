import { ProductType } from 'src/product-type/entities/product-type.entity';
import { Users } from 'src/user/entities';
import { Remove } from 'src/user/entities/users.entity';
export declare class Products {
    id: number;
    title: string;
    description: string;
    price: number;
    stock_quantity: number;
    sales_amount: number;
    product_review: {
        rating: number;
        description: string;
    };
    remove: Remove;
    created_at: Date;
    updated_at: Date;
    type_id: ProductType;
    user_id: Users;
}
