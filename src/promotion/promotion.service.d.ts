import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion, PromotionSub } from './entities/promotion.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { ResponseModel } from '../response/response-model';
import { UploadService } from '../upload/upload.service';
export declare class PromotionService {
    private readonly uploadService;
    private readonly cacheManager;
    private promotionRepository;
    private promotionSubRepository;
    constructor(uploadService: UploadService, cacheManager: Cache, promotionRepository: Repository<Promotion>, promotionSubRepository: Repository<PromotionSub>);
    getRedisPromotion(): Promise<string>;
    getRedisPromotionSub(): Promise<string>;
    setRedisPromotion(data: any): Promise<void>;
    setRedisPromotionSub(data: any): Promise<void>;
    create({ promotions, query }: CreatePromotionDto): Promise<ResponseModel<({
        url: string;
        image: string;
        isSelect: true;
    } & PromotionSub)[]>>;
    findAll(): Promise<ResponseModel<{
        promotion: any[];
        promotionSub: any[];
    }>>;
    findOne(id: number): string;
    update(id: number, { url, image, selectItem, mode }: UpdatePromotionDto): Promise<ResponseModel<any>>;
    remove(id: number): string;
}
