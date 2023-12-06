import { PartialType } from '@nestjs/mapped-types';
import { CreatePromotionDto } from './create-promotion.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ESelect } from '../entities/promotion.entity';

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {
  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsEnum(ESelect)
  selectItem: string;

  mode?: string;
}
