import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities';
import { Repository } from 'typeorm';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Products>);
    create(createProductDto: CreateProductDto): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
