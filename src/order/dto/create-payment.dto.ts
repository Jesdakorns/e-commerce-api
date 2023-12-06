import { IsArray, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber({}, { each: true })
  productId: number[];
}
