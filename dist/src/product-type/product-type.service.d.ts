import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities/product-type.entity';
import { Repository } from 'typeorm';
import { ResponseModel } from 'src/response/response-model';
export declare class ProductTypeService {
    private productTypeRepository;
    constructor(productTypeRepository: Repository<ProductType>);
    create({ title_en, title_th, image }: CreateProductTypeDto): Promise<ResponseModel<{
        title_en: string;
        title_th: string;
        image: string;
    } & ProductType>>;
    findAll(): Promise<ResponseModel<ProductType[]>>;
    findOne(id: number): Promise<ResponseModel<ProductType>>;
    update(id: number, updateProductTypeDto: UpdateProductTypeDto): Promise<ResponseModel<import("typeorm").UpdateResult>>;
    remove(id: number): Promise<ResponseModel<import("typeorm").UpdateResult>>;
}
