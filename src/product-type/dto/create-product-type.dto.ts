import { IsString } from 'class-validator';

export class CreateProductTypeDto {
  @IsString()
  title_en: string;

  @IsString()
  title_th?: string;

  @IsString()
  image: string;
}
