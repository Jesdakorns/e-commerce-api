import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
export declare class DeliveryController {
    private readonly deliveryService;
    constructor(deliveryService: DeliveryService);
    create(createDeliveryDto: CreateDeliveryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDeliveryDto: UpdateDeliveryDto): string;
    remove(id: string): string;
}
