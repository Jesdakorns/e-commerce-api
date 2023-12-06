import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReview, Products } from './entities';
import { ProductOrder } from '../order/entities/productOrder.entity';
import { ProductType } from '../product-type/entities/product-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Products,
      ProductReview,
      ProductOrder,
      ProductType,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
