import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion, PromotionSub } from './entities/promotion.entity';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion, PromotionSub])],
  controllers: [PromotionController],
  providers: [PromotionService, UploadService],
})
export class PromotionModule {}
