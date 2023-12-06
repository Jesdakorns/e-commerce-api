import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(req: any, createProductDto: CreateOrderDto): Promise<import("../response/response-model").ResponseModel<import("typeorm").UpdateResult> | import("../response/response-model").ResponseModel<{
        product: {
            id: number;
        };
        customer: any;
        salesAmount: number;
    } & import("./entities/productOrder.entity").ProductOrder>>;
    payment(req: any, createProductDto: CreatePaymentDto): Promise<import("../response/response-model").ResponseModel<unknown>>;
    findAll(req: any, query: any): Promise<import("../response/response-model").ResponseModel<import("./entities/productOrder.entity").ProductOrder[]>>;
    findOne(req: any, id: string): Promise<string | import("../response/response-model").ResponseModel<import("./entities/productOrder.entity").ProductOrder>>;
    update(id: string, updateOrderDto: UpdateOrderDto): string;
    remove(id: string): string;
}
