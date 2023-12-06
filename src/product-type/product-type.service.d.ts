import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities/product-type.entity';
import { Repository } from 'typeorm';
import { ResponseModel } from 'src/response/response-model';
import { Cache } from 'cache-manager';
import { UploadService } from '../upload/upload.service';
export declare class ProductTypeService {
    private readonly uploadService;
    private readonly cacheManager;
    private productTypeRepository;
    constructor(uploadService: UploadService, cacheManager: Cache, productTypeRepository: Repository<ProductType>);
    getRedisProductType(): Promise<string>;
    setRedisProductType(data: any): Promise<void>;
    create({ titleEn, titleTh, image }: CreateProductTypeDto): Promise<ResponseModel<{
        titleEn: string;
        titleTh: string;
        image: string;
    } & ProductType>>;
    findAll(): Promise<ResponseModel<any>>;
    findOne(id: number): Promise<ResponseModel<ProductType>>;
    update(id: number, { titleEn, titleTh, image }: UpdateProductTypeDto): Promise<ResponseModel<import("typeorm").UpdateResult>>;
    remove(id: number): Promise<ResponseModel<import("typeorm").UpdateResult>>;
}
