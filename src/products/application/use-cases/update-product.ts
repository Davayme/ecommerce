import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/product.repository';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class UpdateProductUseCase {
  constructor( @Inject('IProductRepository') private readonly repo: IProductRepository) {}

  async execute(id: number, data: UpdateProductDto) {
    try {
      return await this.repo.update(id, data);
    } catch (err) {
      throw new Error('Error al actualizar producto');
    }
  }
}