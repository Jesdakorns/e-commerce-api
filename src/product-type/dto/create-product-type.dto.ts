import { IsString } from 'class-validator';

export class CreateProductTypeDto {
  @IsString()
  titleEn: string;

  @IsString()
  titleTh?: string;

  @IsString()
  image?: string;
}
