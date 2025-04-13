import { Controller, Get, Post, Body } from '@nestjs/common';
import { GetAllProductsUseCase } from '../../application/use-cases/get-all-products';
import { CreateProductUseCase } from '../../application/use-cases/create-product';
import { CreateProductDto } from 'src/products/application/dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly getAll: GetAllProductsUseCase,
    private readonly create: CreateProductUseCase,
  ) { }

  @Get()
  async getAllProducts() {
    try {
      return await this.getAll.execute();
    } catch (error) {
      return { message: 'Error al obtener productos' };
    }
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    try {
      return await this.create.execute(body);
    } catch (error) {
      return { message: 'Error al crear producto' };
    }
  }
}