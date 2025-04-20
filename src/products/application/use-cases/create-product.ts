import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor( @Inject('IProductRepository') private readonly repo: IProductRepository) {}

  async execute(data: Partial<ProductEntity>) {
    try {
      return await this.repo.create(data);
    } catch (err) {
      throw new Error('Error al crear producto');
    }
  }
}
