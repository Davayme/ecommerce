// src/infrastructure/repositories/product-prisma.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProductRepository } from 'src/products/domain/repositories/product.repository';
import { ProductEntity } from 'src/products/domain/entities/product.entity';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<ProductEntity[]> {
    try {
      const products = await this.prisma.product.findMany({
        include: {
          category: true, 
        },
      });
  
      return products.map((p) => {
        const { category, ...rest } = p;
        return {
          ...rest,
          categoryName: category.name, 
        };
      });
    } catch (err) {
      throw new Error('Error en base de datos al obtener productos');
    }
  }

  async create(data: Partial<ProductEntity>): Promise<ProductEntity> {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          images: data.images,
          status: true,
          categoryId: data.categoryId,
        },
        include: { category: true },
      });

      return {
        ...newProduct,
        categoryName: newProduct.category.name,
      };
    } catch (err) {
      throw new Error('Error en base de datos al crear producto');
    }
  }
}
