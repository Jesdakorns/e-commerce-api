import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(req: any, createProductDto: CreateProductDto): Promise<import("../response/response-model").ResponseModel<import("./entities").Products>>;
    findAll(query: any): Promise<import("../response/response-model").ResponseModel<any[]>>;
    findTopSell(query: any): Promise<import("../response/response-model").ResponseModel<import("./entities").Products[]>>;
    findOne(id: string): Promise<import("../response/response-model").ResponseModel<import("./entities").Products[]>>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("../response/response-model").ResponseModel<import("typeorm").UpdateResult>>;
    remove(id: string): string;
}
