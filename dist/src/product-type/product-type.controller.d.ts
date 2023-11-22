import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
export declare class ProductTypeController {
    private readonly productTypeService;
    constructor(productTypeService: ProductTypeService);
    create(req: any, createProductTypeDto: CreateProductTypeDto): Promise<import("../response/response-model").ResponseModel<{
        title_en: string;
        title_th: string;
        image: string;
    } & import("./entities/product-type.entity").ProductType>>;
    findAll(req: any): Promise<import("../response/response-model").ResponseModel<import("./entities/product-type.entity").ProductType[]>>;
    findOne(id: string): Promise<import("../response/response-model").ResponseModel<import("./entities/product-type.entity").ProductType>>;
    update(id: string, updateProductTypeDto: UpdateProductTypeDto): Promise<import("../response/response-model").ResponseModel<import("typeorm").UpdateResult>>;
    remove(id: string): Promise<import("../response/response-model").ResponseModel<import("typeorm").UpdateResult>>;
}
