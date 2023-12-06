import { CreatePromotionDto } from './create-promotion.dto';
declare const UpdatePromotionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePromotionDto>>;
export declare class UpdatePromotionDto extends UpdatePromotionDto_base {
    url: string;
    image: string;
    selectItem: string;
    mode?: string;
}
export {};
