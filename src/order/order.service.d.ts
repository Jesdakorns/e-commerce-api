import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OptionPaginate, ResponseModel } from '../response/response-model';
import { Cache } from 'cache-manager';
import { ProductOrder } from './entities/productOrder.entity';
import { JwtService } from '@nestjs/jwt';
import { EntityManager, Repository } from 'typeorm';
import { Products } from '../product/entities';
import { ProductType } from '../product-type/entities/product-type.entity';
import { ProductService } from '../product/product.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class OrderService {
    private readonly cacheManager;
    private productRepository;
    private productTypeRepository;
    private productOrderRepository;
    private jwtService;
    private readonly entityManager;
    private readonly productService;
    constructor(cacheManager: Cache, productRepository: Repository<Products>, productTypeRepository: Repository<ProductType>, productOrderRepository: Repository<ProductOrder>, jwtService: JwtService, entityManager: EntityManager, productService: ProductService);
    getRedisProductIdStock(id: number): Promise<any>;
    setRedisProductIdStock(id: number, data: any): Promise<any>;
    deleteRedisProductIdStock(id: number): Promise<void>;
    create(token: string, { productId, amount }: CreateOrderDto): Promise<ResponseModel<import("typeorm").UpdateResult> | ResponseModel<{
        product: {
            id: number;
        };
        customer: any;
        salesAmount: number;
    } & ProductOrder>>;
    payment(token: string, { productId }: CreatePaymentDto): Promise<ResponseModel<unknown>>;
    findAll(token: string, { limit, page, orderBy, orderByField, }: OptionPaginate): Promise<ResponseModel<ProductOrder[]>>;
    findOne(token: string, id: number): Promise<string | ResponseModel<ProductOrder>>;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    remove(id: number): string;
}
