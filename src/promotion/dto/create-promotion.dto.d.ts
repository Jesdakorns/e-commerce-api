export type TPromotion = {
    url: string;
    image: string;
};
export declare class Promotion {
    url: string;
    image: string;
}
export declare class CreatePromotionDto {
    promotions: Promotion[];
    query: any;
}
