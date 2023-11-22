import { Remove } from 'src/user/entities/users.entity';
export type TProductType = {
    id: number;
    title_en: string;
    title_th: string;
    image: string;
    remove: boolean;
    created_at: Date;
    updated_at: Date;
};
export declare class ProductType {
    id: number;
    title_en: string;
    title_th: string;
    image: string;
    remove: Remove;
    created_at: Date;
    updated_at: Date;
}
