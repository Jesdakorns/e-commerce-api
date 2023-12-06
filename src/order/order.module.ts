import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from '../product-type/entities/product-type.entity';
import { ProductReview, Products } from '../product/entities';
import { ProductOrder } from './entities/productOrder.entity';
import { ProductService } from '../product/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Products,
      ProductReview,
      ProductOrder,
      ProductType,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductService],
})
export class OrderModule {}
