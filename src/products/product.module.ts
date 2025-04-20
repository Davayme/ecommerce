import { Module } from '@nestjs/common';
import { ProductController } from './infraestructure/controllers/products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateProductUseCase } from './application/use-cases/create-product';
import { GetAllProductsUseCase } from './application/use-cases/get-all-products';
import { PrismaProductRepository } from './infraestructure/repositories/product-prisma.repository';
import { UpdateProductUseCase } from './application/use-cases/update-product';
import { DeleteProductUseCase } from './application/use-cases/delete-product';
import { GetProductByIdUseCase } from './application/use-cases/get-by-id';

@Module({
  imports: [PrismaModule],
  providers: [CreateProductUseCase, GetAllProductsUseCase, UpdateProductUseCase, DeleteProductUseCase, GetProductByIdUseCase,
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
  ],
  controllers: [ProductController]
})
export class ProductsModule { }
