import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GetAllProductsUseCase } from '../../application/use-cases/get-all-products';
import { CreateProductUseCase } from '../../application/use-cases/create-product';
import { CreateProductDto } from 'src/products/application/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/application/dto/update-product.dto';
import { UpdateProductUseCase } from 'src/products/application/use-cases/update-product';
import { DeleteProductUseCase } from 'src/products/application/use-cases/delete-product';
import { GetProductByIdUseCase } from 'src/products/application/use-cases/get-by-id';

@Controller('products')
export class ProductController {
  constructor(
    private readonly getAll: GetAllProductsUseCase,
    private readonly create: CreateProductUseCase,
    private readonly update: UpdateProductUseCase,
    private readonly remove: DeleteProductUseCase,
    private readonly getById: GetProductByIdUseCase,
  ) { }

  @Get()
  async getAllProducts() {
    try {
      return await this.getAll.execute();
    } catch (error) {
      return { message: 'Error al obtener productos' };
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      return await this.getById.execute(+id);
    } catch (error) {
      return { message: 'Error al obtener producto' };
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

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ) {
    try {
      return await this.update.execute(+id, body);
    } catch (error) {
      return { message: 'Error al actualizar producto' };
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.remove.execute(+id);
    } catch (error) {
      return { message: 'Error al eliminar producto' };
    }
  }
}