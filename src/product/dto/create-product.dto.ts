import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

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
