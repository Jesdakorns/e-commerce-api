import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stockQuantity: number;

  @IsNumber()
  productType: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsArray()
  coverPhoto: string[];
}
