import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities/product-type.entity';
import { Repository } from 'typeorm';
import { ResponseModel } from 'src/response/response-model';
import { Cache } from 'cache-manager';
export declare class ProductTypeService {
    private readonly cacheManager;
    private productTypeRepository;
    constructor(cacheManager: Cache, productTypeRepository: Repository<ProductType>);
    getRedisProductType(): Promise<string>;
    setRedisProductType(data: any): Promise<void>;
    create({ title_en, title_th, image }: CreateProductTypeDto): Promise<ResponseModel<{
        title_en: string;
        title_th: string;
        image: string;
    } & ProductType>>;
    findAll(): Promise<ResponseModel<any>>;
    findOne(id: number): Promise<ResponseModel<ProductType>>;
    update(id: number, updateProductTypeDto: UpdateProductTypeDto): Promise<ResponseModel<import("typeorm").UpdateResult>>;
    remove(id: number): Promise<ResponseModel<import("typeorm").UpdateResult>>;
}
