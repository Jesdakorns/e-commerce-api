import { Products } from '@/src/product/entities';
export type TProductType = {
    id: number;
    titleEn: string;
    titleTh: string;
    image: string;
    remove: boolean;
    createdAt: Date;
    updatedAt: Date;
};
export declare class ProductType {
    id: number;
    titleEn: string;
    titleTh: string;
    image: string;
    product: Products[];
    remove: boolean;
    createdAt: Date;
    updatedAt: Date;
}
