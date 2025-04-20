import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class GetAllProductsUseCase {
  constructor(@Inject('IProductRepository') private readonly repo: IProductRepository) {}

  async execute() {
    try {
      return await this.repo.findAll();
    } catch (err) {
      throw new Error('Error al obtener productos');
    }
  }
}