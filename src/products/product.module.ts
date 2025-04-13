import { Module } from '@nestjs/common';
import { ProductController } from './infraestructure/controllers/products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateProductUseCase } from './application/use-cases/create-product';
import { GetAllProductsUseCase } from './application/use-cases/get-all-products';
import { PrismaProductRepository } from './infraestructure/repositories/product-prisma.repository';

@Module({
  imports: [PrismaModule],
  providers: [CreateProductUseCase, GetAllProductsUseCase,
    {
      provide: 'IProductRepository',
      useClass: PrismaProductRepository,
    },
  ],
  controllers: [ProductController]
})
export class ProductsModule { }
