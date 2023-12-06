import { Passwords } from '.';
import { ProductOrder } from '@/src/order/entities/productOrder.entity';
import { ProductReview, Products } from '@/src/product/entities';
export declare enum Gender {
    MALE = "male",
    FEMALE = "female"
}
export declare enum Remove {
    FALSE = "false",
    TRUE = "true"
}
export declare enum Provider {
    GOOGLE = "google",
    DEFAULT = "default"
}
export declare class Users {
    id: number;
    email: string;
    name?: string;
    birthday?: Date;
    image: string;
    gender?: Gender;
    phone?: string;
    address?: string;
    provider?: Provider;
    password: Passwords;
    productOrder: ProductOrder[];
    review: ProductReview[];
    product: Products[];
    remove: boolean;
    createdAt: Date;
    updatedAt: Date;
}
