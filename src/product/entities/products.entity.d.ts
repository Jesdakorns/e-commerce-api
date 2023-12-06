import { ProductType } from '@/src/product-type/entities/product-type.entity';
import { Users } from '@/src/user/entities';
import { ProductOrder } from '../../order/entities/productOrder.entity';
import { ProductReview } from './productReview.entity';
export declare class Products {
    id: number;
    title: string;
    description: string;
    price: number;
    coverPhoto: string[];
    stockQuantity: number;
    discount: number;
    priceMinusDiscount: number;
    salesAmount: number;
    productType: ProductType;
    user: Users;
    review: ProductReview[];
    order: ProductOrder[];
    remove: boolean;
    createdAt: Date;
    updatedAt: Date;
}
