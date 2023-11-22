import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities';
import { EntityManager, Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    console.log(
      `🚀 ~ file: product.service.ts ~ line 19 ~ ProductService ~ create ~ createProductDto`,
      createProductDto,
    );
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
