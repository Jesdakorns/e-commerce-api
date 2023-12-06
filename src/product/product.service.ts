import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities';
import { Between, EntityManager, Like, Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ResponseModel } from '../response/response-model';
import * as dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
import { ProductType } from '../product-type/entities/product-type.entity';
import { convertSkipPaginate } from '../utils/pagination';
import { ProductOrder } from '../order/entities/productOrder.entity';
import { Users } from '../user/entities';

type WhereProps =
  | {
      name?: string;
    }
  | any;

@Injectable()
export class ProductService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
    @InjectRepository(ProductOrder)
    private productOrderRepository: Repository<ProductOrder>,
    private jwtService: JwtService,
    private readonly entityManager: EntityManager,
  ) {}

  async getRedisProduct() {
    const redisProduct: string = await this.cacheManager.get('products');
    return redisProduct ? JSON.parse(redisProduct) : null;
  }

  async setRedisProduct(data) {
    await this.cacheManager.set('products', JSON.stringify(data));
  }

  async create(
    token: string,
    {
      title,
      description,
      price,
      coverPhoto,
      stockQuantity,
      productType,
      discount,
    }: CreateProductDto,
  ) {
    const user = await this.jwtService.decode(token);
    const newProductType = await this.productTypeRepository.create({
      id: productType,
    });
    const newProduct = this.productRepository.create({
      title,
      description,
      price,
      coverPhoto,
      stockQuantity,
      user: user?.['id'],
      productType: newProductType,
      discount,
      priceMinusDiscount: price - (discount ?? 0),
    });
    const data = await this.productRepository.save(newProduct);
    return new ResponseModel({ data });
  }

  async findAll({
    limit = 10,
    page = 1,
    order = 'DESC',
    orderByField = 'salesAmount',
    search,
    highPrice,
    lowPrice,
  }: {
    limit: number;
    page: number;
    order: 'DESC' | 'ASC';
    orderByField: string;
    search;
    highPrice;
    lowPrice;
  }) {
    console.log(
      `🚀 ~ file: product.service.ts ~ line 94 ~ ProductService ~ lowPrice`,
      lowPrice,
    );
    console.log(
      `🚀 ~ file: product.service.ts ~ line 94 ~ ProductService ~ order`,
      order,
    );
    const qb = await this.productRepository
      .createQueryBuilder('p')
      .select([
        'p.id as id',
        'p.title as title',
        'p.price as price',
        'p.discount as discount',
        `p.price - p.discount as "priceMinusDiscount"`,
        'p.stockQuantity as "stockQuantity"',
        'p.salesAmount as "salesAmount"',
        'p.coverPhoto as "coverPhoto"',
        `json_build_object(
          'id', pt.id,
          'titleTh',pt."titleTh",
          'titleEn',pt."titleEn"
        ) as productType`,
      ])
      .leftJoin('p.productType', 'pt');

    console.log('qb', qb.getQuery());

    if (search) {
      await qb.where(
        `(p.title LIKE :search or pt."titleTh" LIKE :search or pt."titleEn" LIKE :search)`,
        { search: `%${search}%` },
      );
    }

    if (highPrice && lowPrice) {
      await qb.andWhere(
        '"priceMinusDiscount" BETWEEN :lowPrice AND :highPrice',
        { lowPrice: +lowPrice, highPrice: +highPrice },
      );
    }

    if (orderByField === 'priceMinusDiscount') {
      await qb.orderBy('"priceMinusDiscount"', order || 'DESC');
    } else {
      await qb.orderBy(`p.${orderByField}`, order || 'DESC');
    }

    await qb.offset(convertSkipPaginate({ limit, page }));
    await qb.limit(limit);
    const data = await qb.getRawMany();
    const total = await qb.getCount();
    // const [data, total] = await this.productRepository.findAndCount({
    //   select: {
    //     productType: { id: true, titleEn: true, titleTh: true },
    //     user: { id: true, name: true, image: true },
    //   },
    //   relations: ['productType', 'user'],
    //   where: search
    //     ? [
    //         {
    //           priceMinusDiscount:
    //             highPrice && lowPrice
    //               ? Between(lowPrice, highPrice)
    //               : undefined,
    //         },
    //         { title: search ? Like(`%${search}%`) : undefined },
    //         { title: search ? Like(`%${search}%`) : undefined },
    //         {
    //           productType: {
    //             titleEn: search ? Like(`%${search}%`) : undefined,
    //           },
    //         },
    //         {
    //           productType: {
    //             titleTh: search ? Like(`%${search}%`) : undefined,
    //           },
    //         },
    //       ]
    //     : undefined,

    //   take: limit,
    //   skip: convertSkipPaginate({ limit, page }),
    //   order: { [orderByField]: order, id: 'DESC' },
    // });

    return new ResponseModel({ data, paginate: { total, page, limit } });
  }

  async findTopSell({ limit = 10, page = 1 }) {
    const today = dayjs();
    const monday = today.startOf('week').add(1, 'day');
    const sunday = today.endOf('week').add(1, 'day');

    const [data, total] = await this.productRepository.findAndCount({
      relations: ['order'],
      where: {
        order: {
          sellAt: Between(
            new Date(monday.toISOString()),
            new Date(sunday.toISOString()),
          ),
        },
      },
      take: limit,
      skip: convertSkipPaginate({ limit, page }),
      order: { salesAmount: 'DESC' },
    });
    // .createQueryBuilder('productOrder')
    // .select([
    //   'CAST(sum(productOrder.salesAmount) as int) as "countAmount"',
    //   'MAX("productOrder"."updatedAt") as updatedAt',
    // ])
    // .leftJoin('productOrder.product', 'product')
    // .addSelect([
    //   'product.id as productId',
    //   'product.title as title',
    //   'product.price as price',
    //   'product."coverPhoto" as "coverPhoto"',
    // ])
    // .where('productOrder.updatedAt BETWEEN :startDate AND :endDate', {
    //   startDate: monday.toISOString(),
    //   endDate: sunday.toISOString(),
    // })
    // .andWhere('"productOrder"."statusBuy" = :status', { status: true })
    // .groupBy('product.id,product.title,product.price')
    // .orderBy('sum("productOrder"."salesAmount")', 'DESC')
    // .limit(limit)
    // .getRawMany();

    return new ResponseModel({
      data,
      paginate: {
        total,
        limit,
        page,
      },
    });
  }

  async findOne(id: number) {
    const res = await this.productRepository.find({
      select: {
        productType: { id: true, titleEn: true, titleTh: true },
        user: { id: true, name: true, image: true },
      },
      relations: {
        productType: true,
        user: true,
      },
      where: {
        id,
      },
    });
    return new ResponseModel({
      data: res,
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const res = await this.productRepository.update(id, {
      ...updateProductDto,
      productType: updateProductDto.productType as any,
      updatedAt: new Date(),
    });

    return new ResponseModel({
      data: res,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
