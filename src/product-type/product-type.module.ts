import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from './entities/product-type.entity';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType])],
  controllers: [ProductTypeController],
  providers: [ProductTypeService, UploadService],
})
export class ProductTypeModule {}
