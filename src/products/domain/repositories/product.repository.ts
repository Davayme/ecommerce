import { ProductEntity } from '../entities/product.entity';

export abstract class IProductRepository {
  abstract findAll(): Promise<ProductEntity[]>;
  abstract create(data: Partial<ProductEntity>): Promise<ProductEntity>;
}