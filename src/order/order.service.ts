import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OptionPaginate, ResponseModel } from 'response/response-model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOrder } from './entities/productOrder.entity';
import { JwtService } from '@nestjs/jwt';
import { EntityManager, In, Repository } from 'typeorm';
import { Products } from '../product/entities';
import { ProductType } from '../product-type/entities/product-type.entity';
import { convertSkipPaginate } from '../utils/pagination';
import { ProductService } from '../product/product.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class OrderService {
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
    private readonly productService: ProductService,
  ) {}

  async getRedisProductIdStock(id: number) {
    const res: string = await this.cacheManager.get(`products-${id}-stock`);
    return res ? JSON.parse(res) : undefined;
  }
  async setRedisProductIdStock(id: number, data) {
    await this.cacheManager.set(`products-${id}-stock`, JSON.stringify(data));
    const res: string = await this.cacheManager.get(`products-${id}-stock`);
    return JSON.parse(res);
  }
  async deleteRedisProductIdStock(id: number) {
    await this.cacheManager.del(`products-${id}-stock`);
  }

  async create(token: string, { productId, amount }: CreateOrderDto) {
    const user = await this.jwtService.decode(token);

    const getRedisProductStock = await this.getRedisProductIdStock(productId);
    let product = getRedisProductStock;
    if (!product) {
      const findProduct = await this.productRepository.findOne({
        select: { id: true, stockQuantity: true },
        where: {
          id: productId,
        },
      });
      const findProductOrder = await this.productOrderRepository.findOne({
        select: { id: true },
        where: {
          statusBuy: false,
          product: { id: findProduct.id },
          customer: { id: user?.['id'] },
        },
      });
      product = await this.setRedisProductIdStock(productId, {
        stock: findProduct ? findProduct.stockQuantity : 0,
        orderId: findProductOrder ? findProductOrder.id : null,
        hasOrder: !!findProductOrder?.id,
      });
    }
    if (amount > product.stock) {
      throw new BadRequestException('There is not enough product in stock.');
    }
    if (product.hasOrder) {
      const res = await this.productOrderRepository.update(product.orderId, {
        salesAmount: amount,
        updatedAt: new Date(),
      });
      return new ResponseModel({
        data: res,
      });
    } else {
      const res = await this.productOrderRepository.save({
        product: { id: productId },
        customer: user?.['id'],
        salesAmount: amount,
      });
      await this.setRedisProductIdStock(productId, {
        ...product,
        orderId: res ? res.id : null,
        hasOrder: !!res?.id,
      });
      return new ResponseModel({
        data: res,
      });
    }
  }

  async payment(token: string, { productId }: CreatePaymentDto) {
    const user = await this.jwtService.decode(token);
    const res = await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const resProductOrder = await transactionalEntityManager
          .createQueryBuilder()
          .select('id,"productId","salesAmount"')
          .from(ProductOrder, 'po')
          .where({
            id: In([...productId]),
            statusBuy: false,
            customer: user?.['id'],
          })
          .execute();
        if (resProductOrder.length === 0) {
          throw new BadRequestException('No order.');
        }
        await transactionalEntityManager
          .createQueryBuilder()
          .update(Products)
          .set({
            stockQuantity: () => `
          (
            select
              (products."stockQuantity") - SUM(po."salesAmount") as "salesAmount"
            from
              "product_order" "po"
            where
              po."productId" = products.id
              and po."customerId" = :userId
              and po."statusBuy" = :statusBuy
            group by
              products.id
          )
          `,
            salesAmount: () => `
          (
            select
              (Products."salesAmount") + SUM(po."salesAmount") as "salesAmount"
            from
              "product_order" "po"
            where
              po."productId" = products.id
              and po."customerId" = :userId
              and po."statusBuy" = :statusBuy
            group by
              products.id
          )
          `,
          })
          .where({
            id: In([...resProductOrder.map((val) => val.productId)]),
          })
          .setParameters({
            userId: user?.['id'],
            statusBuy: false,
          })
          .execute();

        const updateProductOrder = await transactionalEntityManager
          .createQueryBuilder()
          .update(ProductOrder)
          .set({
            statusBuy: true,
            sellAt: new Date(),
          })
          .where({
            id: In([...resProductOrder.map((val) => val.id)]),
          })
          .returning('"id","productId","salesAmount"') // '*' means return all columns; you can specify specific columns if needed
          .execute();
        return {
          status: !!updateProductOrder.generatedMaps,
          productIds: [...resProductOrder.map((val) => val.productId)],
        };
      },
    );
    if (res.status) {
      for (const valProductId of res.productIds) {
        this.deleteRedisProductIdStock(valProductId);
      }
    }
    return new ResponseModel({ message: 'Payment successful' });
  }

  async findAll(
    token: string,
    {
      limit = 10,
      page = 1,
      orderBy = 'DESC',
      orderByField = 'salesAmount',
    }: OptionPaginate,
  ) {
    const user = await this.jwtService.decode(token);
    const [data, total] = await this.productOrderRepository.findAndCount({
      relations: ['product', 'customer'],
      where: { customer: { id: user?.['id'] }, statusBuy: false },
      take: limit,
      skip: convertSkipPaginate({ limit, page }),
    });
    return new ResponseModel({
      data,
      paginate: { total, limit, page },
    });
    // .createQueryBuilder('products')
    // .select([
    //   'products.id as id',
    //   'products.title as title',
    //   'products.price as price',
    //   'products.coverPhoto as coverPhoto',
    //   'product_order.customerId',
    //   '',
    //   // 'CAST(sum(product_order."salesAmount") as int) as amount',
    //   // 'MAX(product_order."customerId")',
    // ])
    // .leftJoin('products.order', 'product_order')
    // // .select([
    // //   'products.id as "id"',
    // //   'products.title as title',
    // //   'products.price as price',
    // //   'products."coverPhoto" as "coverPhoto"',
    // // ])

    // .where('product_order."statusBuy" = :status', { status: false })
    // .andWhere('product_order."customerId"  = :userId', {
    //   userId: user?.['id'],
    // })
    // .groupBy(
    //   ' products.id , product_order."salesAmount",product_order."customerId"',
    // )
    // .orderBy('products.id', orderBy);
    // qb.limit(limit);
    // qb.offset(Number((+page - 1) * limit));
    // console.log(qb.getSql());
    // const total = await qb.getCount();
    // const data = await qb.getRawMany();
    // const qb = await this.productOrderRepository
    //   .createQueryBuilder('productOrder')
    //   .select([
    //     'CAST(sum(productOrder.salesAmount) as int) as "countAmount"',
    //     'MAX("productOrder"."customerId") as "customerId"',
    //   ])
    //   .leftJoin('productOrder.product', 'product')
    //   .addSelect([
    //     'product.id as "id"',
    //     'product.title as title',
    //     'product.price as price',
    //     'product."coverPhoto" as "coverPhoto"',
    //   ])
    //   .where('"productOrder"."statusBuy" = :status', { status: false })
    //   .andWhere('"productOrder"."customerId"  = :userId', {
    //     userId: user?.['id'],
    //   })
    //   .groupBy('product.id,product.title,product.price')
    //   .orderBy('CAST(sum(productOrder.salesAmount) as int)', orderBy);

    // const total = await qb.getCount();
    // qb.limit(limit);
    // qb.offset(Number((+page - 1) * limit));

    // const { entities } = await qb.getRawAndEntities();

    // return new ResponseModel({
    //   data,
    //   paginate: { total, limit, page },
    // });
  }

  async findOne(token: string, id: number) {
    const user = await this.jwtService.decode(token);
    const data = await this.productOrderRepository.findOne({
      relations: ['product', 'customer'],
      where: { id, statusBuy: false, customer: { id: user?.['id'] } },
    });
    return new ResponseModel({
      data,
    });
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
