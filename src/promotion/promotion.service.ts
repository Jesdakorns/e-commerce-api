import { Inject, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ESelect, Promotion, PromotionSub } from './entities/promotion.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { ResponseModel } from '../../response/response-model';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class PromotionService {
  constructor(
    private readonly uploadService: UploadService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
    @InjectRepository(PromotionSub)
    private promotionSubRepository: Repository<PromotionSub>,
  ) {}

  async getRedisPromotion() {
    const redisPromotion: string = await this.cacheManager.get('promotion');
    return redisPromotion;
  }

  async getRedisPromotionSub() {
    const redisPromotionSub: string = await this.cacheManager.get(
      'promotionSub',
    );
    return redisPromotionSub;
  }

  async setRedisPromotion(data) {
    await this.cacheManager.set('promotion', JSON.stringify(data));
  }

  async setRedisPromotionSub(data) {
    await this.cacheManager.set('promotionSub', JSON.stringify(data));
  }

  async create({ promotions, query }: CreatePromotionDto) {
    const redisPromotion = await this.getRedisPromotion();
    const redisPromotionSub = await this.getRedisPromotionSub();
    const res = await Promise.all(
      promotions.map(async ({ url, image }) => {
        const data =
          query?.type === 'sub'
            ? await this.promotionSubRepository.save({
                url,
                image,
                isSelect: true,
              })
            : await this.promotionRepository.save({
                url,
                image,
                isSelect: true,
              });
        return data;
      }),
    );

    if (query?.type === 'sub' && redisPromotionSub) {
      await this.setRedisPromotionSub([
        ...JSON.parse(redisPromotionSub),
        ...res,
      ]);
    }
    if (query?.type !== 'sub' && redisPromotion) {
      await this.setRedisPromotion([...JSON.parse(redisPromotion), ...res]);
    }

    return new ResponseModel({
      data: res,
    });
  }

  async findAll() {
    const data = {
      promotion: [],
      promotionSub: [],
    };
    const redisPromotion = await this.getRedisPromotion();
    const redisPromotionSub = await this.getRedisPromotionSub();
    if (redisPromotionSub) {
      data.promotionSub = JSON.parse(redisPromotionSub);
    } else {
      const resSub = await this.promotionSubRepository.find({
        where: { isSelect: true },
        order: {
          id: 'ASC',
        },
        take: 2,
      });
      await this.setRedisPromotionSub(resSub);
      data.promotionSub = resSub;
    }
    if (redisPromotion) {
      data.promotion = JSON.parse(redisPromotion);
    } else {
      const res = await this.promotionRepository.find({
        where: { isSelect: true },
        order: {
          id: 'ASC',
        },
        take: 10,
      });
      await this.setRedisPromotion(res);
      data.promotion = res;
    }

    return new ResponseModel({
      data,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} promotion`;
  }

  async update(
    id: number,
    { url, image, selectItem, mode }: UpdatePromotionDto,
  ) {
    const redisPromotion = await this.getRedisPromotion();
    const redisPromotionSub = await this.getRedisPromotionSub();
    const data = {
      url,
      image,
      isSelect: /true/.test(selectItem) ? true : false,
      updatedAt: new Date(),
    };
    let res;
    if (mode === 'sub') {
      res = await this.promotionSubRepository.update(id, data);

      if (redisPromotionSub) {
        await this.cacheManager.del('promotionSub');
      }
    } else {
      res = await this.promotionRepository.update(id, data);

      if (redisPromotion) {
        await this.cacheManager.del('promotion');
      }
    }

    return new ResponseModel({ data: res });
  }

  remove(id: number) {
    return `This action removes a #${id} promotion`;
  }
}
