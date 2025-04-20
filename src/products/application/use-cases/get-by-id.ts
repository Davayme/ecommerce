import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "src/products/domain/repositories/product.repository";


@Injectable()
export class GetProductByIdUseCase {
  constructor(@Inject('IProductRepository') private readonly repo: IProductRepository) {}

  async execute(id: number) {
    try {
      return await this.repo.findById(id);
    } catch (err) {
      throw new Error('Error al obtener producto por ID');
    }
  }
}