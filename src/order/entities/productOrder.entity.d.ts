import { Users } from '@/src/user/entities';
import { Products } from '../../product/entities/products.entity';
export declare class ProductOrder {
    id: number;
    salesAmount: number;
    discount: number;
    product: Products;
    customer: Users;
    statusBuy: boolean;
    remove: boolean;
    createdAt: Date;
    updatedAt: Date;
    sellAt: Date;
}
