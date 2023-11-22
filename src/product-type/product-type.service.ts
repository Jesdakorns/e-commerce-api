import { Inject, Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType, TProductType } from './entities/product-type.entity';
import { Repository } from 'typeorm';
import { ResponseModel } from 'src/response/response-model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Remove } from 'src/user/entities/users.entity';

@Injectable()
export class ProductTypeService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  async getRedisProductType() {
    const redisProductType: string = await this.cacheManager.get('productType');
    return redisProductType;
  }

  async setRedisProductType(data) {
    await this.cacheManager.set('productType', JSON.stringify(data));
  }

  async create({ title_en, title_th, image }: CreateProductTypeDto) {
    const redisProductType = await this.getRedisProductType();
    const res = await this.productTypeRepository.save({
      title_en,
      title_th,
      image,
    });

    if (redisProductType) {
      const productType = JSON.parse(redisProductType);
      productType.push(res);
      await this.setRedisProductType(productType);
    }

    return new ResponseModel({ data: res });
  }

  async findAll() {
    const redisProductType = await this.getRedisProductType();
    if (redisProductType) {
      return new ResponseModel({
        data: JSON.parse(redisProductType),
      });
    } else {
      const res = await this.productTypeRepository.find({
        where: {
          remove: Remove.FALSE,
        },
        order: {
          id: 'ASC',
        },
      });
      await this.setRedisProductType(res);
      return new ResponseModel({ data: res });
    }
  }

  async findOne(id: number) {
    const res = await this.productTypeRepository.findOne({ where: { id } });

    return new ResponseModel({ data: res });
  }

  async update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    const redisProductType = await this.getRedisProductType();
    const data = {
      title_en: updateProductTypeDto.title_en,
      title_th: updateProductTypeDto.title_th,
      image: updateProductTypeDto.image,
      updated_at: new Date(),
    };
    const res = await this.productTypeRepository.update(id, data);
    if (redisProductType) {
      const productType: TProductType[] = JSON.parse(redisProductType);
      const idx = productType.findIndex((val) => val.id === id);
      productType[idx] = {
        ...productType[idx],
        ...data,
      };
      await this.setRedisProductType(productType);
    }

    return new ResponseModel({ data: res });
  }

  async remove(id: number) {
    const redisProductType = await this.getRedisProductType();
    const res = await this.productTypeRepository.update(id, {
      remove: Remove.TRUE,
      updated_at: new Date(),
    });
    if (redisProductType) {
      const productType: TProductType[] = JSON.parse(redisProductType);
      const idx = productType.findIndex((val) => val.id === id);
      productType.splice(idx, 1);

      await this.setRedisProductType(productType);
    }
    return new ResponseModel({ data: res });
  }
}
