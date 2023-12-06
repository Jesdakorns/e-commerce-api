import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export type TPromotion = { url: string; image: string };

export class Promotion {
  @IsOptional()
  @IsString()
  url: string;

  @IsString()
  image: string;
}

export class CreatePromotionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Promotion)
  promotions: Promotion[];

  query: any;
}
