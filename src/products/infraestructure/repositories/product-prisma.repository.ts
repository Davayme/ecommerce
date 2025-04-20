// src/infrastructure/repositories/product-prisma.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProductRepository } from 'src/products/domain/repositories/product.repository';
import { ProductEntity } from 'src/products/domain/entities/product.entity';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) { }

  findById(id: number): Promise<ProductEntity> {
    try {
      return this.prisma.product.findUnique({
        where: { id   },
        include: { category: true },
      }).then((p) => {
        const { category, ...rest } = p;
        if (!p) throw new Error('Producto no encontrado');
        return {
          ...rest,
          categoryName: category.name,
        };
      });
    }
    catch (err) {
      throw new Error('Error en base de datos al obtener producto');
    }
  }


  async findAll(): Promise<ProductEntity[]> {
    try {
      const products = await this.prisma.product.findMany({
        include: {
          category: true,
        },
        where: {
          status: true,
        },
        orderBy: {
          createdAt: 'desc',
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

  async update(id: number, data: any): Promise<ProductEntity> {
    try {
      const updated = await this.prisma.product.update({
        where: { id },
        data,
        include: { category: true },
      });

      return {
        ...updated,
        categoryName: updated.category.name,
      };
    } catch (err) {
      throw new Error('Error en base de datos al actualizar producto');
    }
  }

  async softDelete(id: number): Promise<ProductEntity> {
    try {
      const updated = await this.prisma.product.update({
        where: { id },
        data: { status: false },
        include: { category: true },
      });

      return {
        ...updated,
        categoryName: updated.category.name,
      };
    } catch (err) {
      throw new Error('Error en base de datos al eliminar producto');
    }
  }
}
