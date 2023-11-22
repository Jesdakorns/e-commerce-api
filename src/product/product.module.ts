import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReview, Products } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Products, ProductReview])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
