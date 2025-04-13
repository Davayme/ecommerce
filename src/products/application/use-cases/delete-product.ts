import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class DeleteProductUseCase {
    constructor(@Inject('IProductRepository') private readonly repo: IProductRepository) { }

    async execute(id: number) {
        try {
            return await this.repo.softDelete(id);
        } catch (err) {
            throw new Error('Error al eliminar producto');
        }
    }
}