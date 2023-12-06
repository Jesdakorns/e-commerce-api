import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
export declare class PromotionController {
    private readonly promotionService;
    constructor(promotionService: PromotionService);
    create(host: string, { promotions }: CreatePromotionDto, query: any): Promise<import("../response/response-model").ResponseModel<({
        url: string;
        image: string;
        isSelect: true;
    } & import("./entities/promotion.entity").PromotionSub)[]>>;
    findAll(): Promise<import("../response/response-model").ResponseModel<{
        promotion: any[];
        promotionSub: any[];
    }>>;
    findOne(id: string): string;
    update(id: string, updatePromotionDto: UpdatePromotionDto): Promise<import("../response/response-model").ResponseModel<any>>;
    remove(id: string): string;
    1: any;
}
