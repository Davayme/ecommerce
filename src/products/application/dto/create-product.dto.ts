import { IsString, IsNotEmpty, IsNumber, IsArray, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsInt()
  stock: number;

  @IsArray()
  images: string[];

  @IsInt()
  categoryId: number;
}
