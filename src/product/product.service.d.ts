import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities';
import { EntityManager, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { ResponseModel } from '../response/response-model';
import { JwtService } from '@nestjs/jwt';
import { ProductType } from '../product-type/entities/product-type.entity';
import { ProductOrder } from '../order/entities/productOrder.entity';
export declare class ProductService {
    private readonly cacheManager;
    private productRepository;
    private productTypeRepository;
    private productOrderRepository;
    private jwtService;
    private readonly entityManager;
    constructor(cacheManager: Cache, productRepository: Repository<Products>, productTypeRepository: Repository<ProductType>, productOrderRepository: Repository<ProductOrder>, jwtService: JwtService, entityManager: EntityManager);
    getRedisProduct(): Promise<any>;
    setRedisProduct(data: any): Promise<void>;
    create(token: string, { title, description, price, coverPhoto, stockQuantity, productType, discount, }: CreateProductDto): Promise<ResponseModel<Products>>;
    findAll({ limit, page, order, orderByField, search, highPrice, lowPrice, }: {
        limit: number;
        page: number;
        order: 'DESC' | 'ASC';
        orderByField: string;
        search: any;
        highPrice: any;
        lowPrice: any;
    }): Promise<ResponseModel<any[]>>;
    findTopSell({ limit, page }: {
        limit?: number;
        page?: number;
    }): Promise<ResponseModel<Products[]>>;
    findOne(id: number): Promise<ResponseModel<Products[]>>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<ResponseModel<import("typeorm").UpdateResult>>;
    remove(id: number): string;
}
