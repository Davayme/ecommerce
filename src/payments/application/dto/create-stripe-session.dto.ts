import { IsArray, IsInt, Min } from 'class-validator';

export class CreateStripeSessionProductDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateStripeSessionDto {
  @IsArray()
  products: CreateStripeSessionProductDto[];
}
